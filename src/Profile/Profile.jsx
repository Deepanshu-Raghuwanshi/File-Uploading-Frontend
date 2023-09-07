import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../Routes/routes.json'
import styles from './Profile.module.css'
import { saveAs } from 'file-saver'

const Profile = () => {

  const navigate = useNavigate()

  const [pimage, setPimage] = useState(null)

  const location = useLocation();

  const [file, setFile] = useState(null)


  var username = location.state.username;

  useEffect(() => {
    const data = {
      username: username
    }
    axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/profile/dataByUsername", data, {
      headers: { "Content-Type": "application/json" }
    }).then((data) => {
      setPimage(data.data.data.images)
    })

  }, [])


  const handleFile = (e) => {
    setFile(e.target.files[0])
  }


  const deleteHandler = (id) => {
    const data = {
      id: id,
      username: username
    }
    axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/profile/delete", data, {
      headers: { "Content-Type": "application/json" }
    }).then((data) => {
      setPimage(data.data.data.images)
    })
  }


  const downloadHandler = (id) => {
    const token = window.prompt("Verify Your Six Digit Pin");

    console.log(isNaN(+token))
    if (token.length != 6 || isNaN(+token) === true) {
      alert('Enter Valid Six Digit Pin In Numbers')
    } else {
      const data = {
        id: id,
        username: username,
        token: token
      }
      axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/profile/download", data, {
        headers: { "Content-Type": "application/json" }
      }).then((data) => {
        const downloadUrl = data.data;
        const fileName = downloadUrl.split("/").pop();
    saveAs(downloadUrl, fileName)
        // const link = document.createElement("a");
        // link.href = downloadUrl;
        // link.setAttribute("download", 'download.jpg');
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
      }).catch((error) => {
        console.error("Download error:", error);
      });
    }
  }

  const uploadHandler = () => {
    if (!file) {
      alert('Select File To Upload')
    } else {
      const token = window.prompt("Verify Your Six Digit Pin");

      if (token.length != 6 || isNaN(+token) === true) {
        alert('Enter Valid Six Digit Pin In Numbers')
      } else {
        const data = {
          username: username
        }
        axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/profile/dataByUsername", data, {
          headers: { "Content-Type": "application/json" }
        })
          .then((data) => {
            let token1 = data.data.data.token
            if (+token === +token1) {

              const formData = new FormData();
              formData.append('username', username);
              formData.append('file', file)

              axios.post("https://file-uploading-dipanshuraghuwa.december-node-2022.repl.co/profile/File", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
                .then((data) => {
                  var images = data.data.data.images
                  setPimage(images)
                }).catch((err) => {
                  alert('Invalid Username Password')
                })

            } else {
              alert('Enter Right Pin')
            }
          }).catch((err) => {
            alert('Invalid Username ')
          })
      }
    }
  }

  const logoutHandler = () => {
    navigate('/login')
  }

  return (<>
    <h3>Hello {username}</h3>
    <hr />
    <div>
      <h6>Upload Your Files Here</h6>
      <br />
      <br />
      <div className={styles.fileupload}>
        <label className={styles.fileuploadlabel}>Upload File</label>
        <input type='file' className={styles.fileuploadinput} onChange={handleFile} />
      </div>
      <br />
      <br />
      <Button onClick={uploadHandler} variant="primary">Upload</Button>
      <br />
      <hr />
      <h3>Files List</h3>
      {pimage && pimage.map((ele, index) => (
        <div className={styles.center}>
          <div key={ele.id} className={styles.imagecontainer} >
            <li>{ele.url},{index}</li>
            <Button onClick={() => { downloadHandler(ele._id) }} variant="info">Download</Button>
            <Button onClick={() => { deleteHandler(ele._id) }} variant="danger">Delete</Button>
          </div>
        </div>
      ))}
    </div>
    <hr/>
    <Button onClick={logoutHandler} variant="warning">Logout</Button>
  </>)
}
export default Profile