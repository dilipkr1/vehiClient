// import React, { useState } from 'react';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 15,
//     borderRadius: 5,
//   },
//   colorPrimary: {
//     backgroundColor: "#EEEEEE",
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }))(LinearProgress);

// const Upload = () => {
//   const [currentFile, setCurrentFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [message, setMessage] = useState('');
//   const [imageInfos, setImageInfos] = useState([]);
//   const [isError, setIsError] = useState(false);

//   const selectFile = (event) => {
//     setCurrentFile(event.target.files[0]);
//     setPreviewImage(URL.createObjectURL(event.target.files[0]));
//   };

//   const upload = () => {
//     console.log("hello how are i")
//     };

//   return (
//     <div className="mg20">
//       <label htmlFor="btn-upload">
//         <input
//           id="btn-upload"
//           name="btn-upload"
//           style={{ display: 'none' }}
//           type="file"
//           accept="image/*"
//           onChange={selectFile}
//         />
//         <Button
//           className="btn-choose"
//           variant="outlined"
//           component="span"
//         >
//           Choose Image
//         </Button>
//       </label>
//       <div className="file-name">
//         {currentFile ? currentFile.name : null}
//       </div>
//       <Button
//         className="btn-upload"
//         color="primary"
//         variant="contained"
//         component="span"
//         disabled={!currentFile}
//         onClick={upload}
//       >
//         Upload
//       </Button>

//       {currentFile && (
//         <Box className="my20" display="flex" alignItems="center">
//           <Box width="100%" mr={1}>
//             <BorderLinearProgress variant="determinate" value={progress} />
//           </Box>
//           <Box minWidth={35}>
//             <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
//           </Box>
//         </Box>)
//       }

//       {previewImage && (
//         <div>
//           <img className="preview my20" src={previewImage} alt="" />
//         </div>
//       )}

//       {message && (
//         <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
//           {message}
//         </Typography>
//       )}

//       <Typography variant="h6" className="list-header">
//         List of Images
//       </Typography>
//       <ul className="list-group">
//         {imageInfos &&
//           imageInfos.map((image, index) => (
//             <ListItem
//               divider
//               key={index}>
//               <img src={image.url} alt={image.name} height="80px" className="mr20" />
//               <a href={image.url}>{image.name}</a>
//             </ListItem>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default Upload;
