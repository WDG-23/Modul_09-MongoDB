import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleChange = (e) => {
    const fileToUpload = e.target.files[0];

    setFile(fileToUpload);
    setPreview(URL.createObjectURL(fileToUpload));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      setError(null);

      const res = await fetch('http://localhost:3000/file-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      console.log(data);
      setUploadedImage(data.location);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {uploadedImage && (
        <div>
          <h2>Uploadad image</h2>
          <img src={uploadedImage} alt='' />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='file'
          name='image'
          id='image'
          onChange={handleChange}
          className='file:bg-amber-600 file:py-2 file:px-1 file:rounded-lg w-full cursor-pointer file:cursor-pointer my-2'
        />
        <button>Upload</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
      {preview && (
        <>
          <h2>Preview Image</h2>
          <img src={preview} alt='' />
        </>
      )}
    </>
  );
}

export default App;
