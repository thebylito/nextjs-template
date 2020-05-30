const downloadFile = (url, fileName = '') => {
  // Create an invisible A element
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = url;

  // Use download attribute to set set desired file name
  a.setAttribute('download', fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};

export default downloadFile;
