import React, { useEffect, useState, useRef, useContext } from 'react';
import Styles from './Notes.module.css';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';
import './Contact.css';
import debounce from '../../utils/debounce';
import { AuthContext } from '../../Context/AuthContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllNotesActionCreator,
  addNoteActionCreator,
  deleteNoteActionCreator,
  updateNoteActionCreator,
} from '../../Redux/NoteReducer/action';

const baseurl = process.env.REACT_APP_BASE_URL;

const Notes = () => {
  const dispatch = useDispatch();
  let nav = useNavigate();

  let { authState } = useContext(AuthContext);
  console.log(authState);
  let [name, setName] = useState('');
  let [note, setNote] = useState({
    title: '',
    description: '',
  });
  let [notes, setNotes] = useState([]);
  const [originalData, setOriginalData] = useState([...notes]);

  let [user, setUser] = useState({});
  const form = useRef();
  const name1 = useRef();
  const token = localStorage.getItem('note_auth_token');

  useEffect(() => {
    // dispatch(getAllNotesActionCreator());

    fetch(`${baseurl}/note`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);

        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.data);
        console.log(data.user);

        setNotes(data.data);
        setOriginalData(data.data);

        setName(data.user.name);
        setUser(data.user);
      })

      .catch((error) => {
        console.log(error.message);
        alert(error.message);
        if (error.message === 'Please Login') {
          nav('/login');
        }
        nav('/login');
      });
  }, []);

  const data = useSelector((data) => {
    return data.noteReducer.notes;
  });

  console.log(data);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const onChange = (e) => {
    let { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    const token = localStorage.getItem('note_auth_token');

    e.preventDefault();
    console.log(note);

    fetch(`${baseurl}/note`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setNotes([...notes, data]);
        setOriginalData([...notes, data]);
        setNote({
          title: '',
          description: '',
        });
        alert('Note Created');
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

    setNotes([...notes, note]);
    setOriginalData([...notes, note]);
  };
  const deleteData = (id, index) => {
    const token = localStorage.getItem('note_auth_token');

    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setOriginalData(updatedNotes);

    //     console.log(id,index);
    //  notes.slice(index,1);
    //  setNotes(notes);
    //  console.log(notes);
    fetch(`${baseurl}/note/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((data) => {
        alert('Note Deleted');
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  const convertToIST = (inputDate) => {
    const inputMoment = moment(inputDate);
    const convertedMoment = inputMoment
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss');
    return convertedMoment;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(name1.current.value);
    emailjs
      .sendForm(
        'service_kbszkub',
        'template_zh2w04s',
        form.current,
        'gDk9wIv6C4sjEMqs2'
      )
      .then(
        (result) => {
          // console.log(result.text);
          // alert('Message Sent to Shabbir');
          toast.success(`${name1.current.value} Message Sent to Shabbir`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          console.log(error.text);
        }
      )
      .catch((error) => {
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.target.reset();
  };

  const searchThings = (e) => {
    const q = e.target.value;
    const token = localStorage.getItem('note_auth_token');
    const baseurl = process.env.REACT_APP_BASE_URL;

    debounce(() => {
      fetch(`${baseurl}/note?s=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(data.data);
          console.log(data.user);

          setNotes(data.data);
          setOriginalData(data.data);

          setName(data.user.name);
          setUser(data.user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 3000);
  };

  const localSearch = (e) => {
    console.log('original', originalData);

    let query = e.target.value;
    console.log(query);

    if (query === '') {
      setNotes([...originalData]);
    }

    console.log(query);

    let filteredData = originalData.filter((element, index) => {
      return (
        element.title.toLowerCase().includes(query.toLowerCase()) ||
        element.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    console.log(filteredData);

    setNotes(filteredData);
  };

  return (
    <div>
      <nav>
        <h1>{`welcome ${name}`} </h1>
        <div className={Styles.avtarDiv}>
          {user.image && <img src={user.image} alt="" />}
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('note_auth_token');
            window.location.reload();
          }}
        >
          Logout
        </button>
      </nav>

      <div style={{ marginTop: '20px' }}>
        <form onSubmit={onSubmit} style={{ display: 'grid' }}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title..."
            value={note.title}
            onChange={onChange}
            required
          />{' '}
          &nbsp;
          <textarea
            type="text"
            name="description"
            placeholder="Enter Description..."
            value={note.description}
            onChange={onChange}
            required
          />{' '}
          &nbsp;
          <input type="submit" value="Add" />
        </form>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="search"
          name="search"
          placeholder="Search By Word Here..."
          onChange={searchThings}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <input
          type="search"
          name="search"
          placeholder="Deep Search Here..."
          onChange={localSearch}
        />
      </div>

      {notes.length === 0 ? (
        <h1 style={{ margin: '20px auto' }}>Nothing...</h1>
      ) : (
        <table
          style={{
            margin: '20px auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <NavLink
                      to={`/notes/${element._id}`}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      {element.title}
                    </NavLink>
                  </td>
                  <td style={{ cursor: 'pointer' }}>
                    {' '}
                    <NavLink
                      to={`/notes/edit/${element._id}`}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      <AiOutlineEdit color="green" size={20} />
                    </NavLink>{' '}
                  </td>
                  <td
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      deleteData(element._id, index);
                    }}
                  >
                    <AiFillDelete color="red" size={20} />
                  </td>
                  <td>{convertToIST(element.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <section id="contact" style={{ marginTop: 50 }}>
        <h5>I'm Growing ! Get in Touch</h5>
        <pre>
          <p>share your valueable feedback!</p>
          <p>with descritption</p>
          <p>where i need to improve or your requirements!</p>
        </pre>
        <h2>Contact Me</h2>

        <div
          className="container contact_container"
          style={{ marginBottom: '20px' }}
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            style={{ display: 'grid', gap: 10 }}
          >
            <input
              ref={name1}
              type="text"
              name="name1"
              placeholder="Full Name"
              value={user.name}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              required
            />
            <textarea
              name="message"
              rows="7"
              placeholder="Type your message"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Notes;
