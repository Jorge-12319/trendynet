import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

const ContactenosPagina = () => {

  const usuarioString = sessionStorage.getItem('usuario');
  const usuario = JSON.parse(usuarioString)

  const [sender, setSender] = useState(usuario?.email);
  const [msgBody, setMsgBody] = useState("");
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
    console.log(file)
  };

  const handleMsgBodyChange = (value) => {
    setMsgBody(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!(JSON.parse(sessionStorage.getItem('usuario')))){
      Swal.fire('Advertencia', 'No puede realizar consultas si no inicia sesion', 'error')
    }else{
      setLoading(true);

      const plainText = document.querySelector('.ql-editor').innerText;

      const formData = new FormData();
      formData.append('sender', sender);
      formData.append('msgBody', plainText);
      formData.append('subject', subject);
      formData.append('attachment', attachment);

      try {
        const response = await axios.post('http://localhost:8080/sendEmail', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          Swal.fire('Exito', `Se ha enviado el correo Con Exito`, 'success')
          console.log('Email sent successfully!');
        } else {
          Swal.fire('Error', `Error en el envio`, 'error')
          console.error('Failed to send email.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      } finally{
        setLoading(false);
      }
    }
  };

  
  return (
    <div className='w-full flex flex-wrap flex-col my-10'>
      <h2 className='text-center my-10 text-2xl font-bold'>Contactenos</h2>
      <div className='flex justify-center'>
        {/*
        <form action="" className='flex flex-col w-[25rem]' >
          <input type="text" className='px-10 py-2 border-2 border-slate-500 bg-black text-white rounded-full w-full my-10' placeholder='Ingrese su correo'/>
          <textarea className='px-10 py-2 border-2 border-slate-500 bg-black text-white my-10 rounded-md' placeholder='Ingrese Asunto' rows={7}/>
          <button className='w-[10rem] mx-auto py-3 px-1 my-20 bg-indigo-600 text-white rounded-full hover:bg-indigo-800'>Contactar</button>
        </form>
      */}

        <form className='flex flex-col w-[25rem]' onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Sender:
        <input className='px-10 py-2 border-2 border-slate-500 bg-black text-white rounded-full w-full my-10' type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
      </label>
      <label>
        Subject:
        <input className='px-10 py-2 border-2 border-slate-500 bg-black text-white rounded-full w-full my-10' type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </label>
      <label>
        Message Body:
        <ReactQuill className='h-[10rem] my-10' value={msgBody} onChange={handleMsgBodyChange} />
      </label>
      <label className='my-10'>
        Attachment:
        <input type="file" className='px-10 py-2 border-2 border-slate-500 bg-black text-white rounded-full w-full my-10' onChange={handleAttachmentChange} />
      </label>
        <button className='bg-indigo-600 text-white rounded py-2' type="submit">
        {loading ? 'Enviando...' : 'Enviar Email'}
        </button>
      </form>

      </div>
    </div>
  )
}

export default ContactenosPagina
