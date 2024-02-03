
 const fileUploader = async (file) => {
     // form data obj form appending files and additional data(foor cloudinary) 
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Realtime-Chat-App');
    formData.append('cloud_name', 'dgvcq2pqp');

    const response = await fetch('https://api.cloudinary.com/v1_1/dgvcq2pqp/image/upload', {
      method: 'post',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    return response.json();
  };

  export default fileUploader