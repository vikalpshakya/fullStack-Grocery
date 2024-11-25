import { useState, React } from 'react'
import { statuses } from '../utils/styles';
import {Spinner} from '../components';
import { FaCloudUploadAlt, MdDelete } from '../assets/icons';
import {  
  deleteObject,
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable,
 } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { 
  alertDanger, 
  alertNull, 
  alertSuccess,
 } from '../context/actions/alertAction';
import { motion } from 'framer-motion';
import { buttonClick } from '../animation';
import { addNewProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';


const DBNewIteam = () => {
  const [itemName, setItemName]  =useState("");
  const [price, setPrice]  =useState("");
  const [category, setCategory]  =useState(null);
  const [isloading, setIsLoading]  =useState(false); 
  const [progress, setProgress]  =useState(null);
  const [imageDownloadUrl, setImageDownloadUrl]  =useState(null);
  const alert=useSelector((state)=>state.alert);
  const dispatch=useDispatch();
  const storage=getStorage();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile=e.target.files[0];

    if (!imageFile) {
      console.error("No file selected.");
      setIsLoading(false);
      return;
    }
  
    // const storageRef=ref(storage, `Images/${imageFile.name}`);
    const storageRef=ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask=uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed", 
      
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },

      (error) => {
        dispatch(alertDanger(`Error:${error} `));
        setTimeout(()=>{
          dispatch(alertNull());
        }, 3000);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded to the cloud"));
          setTimeout(()=>{
            dispatch(alertNull());
          }, 3000);
        });

      }
    ); 
  };

  const   deleteImageFormFirebase = () => { 
    setIsLoading(true);
    const deleteRef=ref(storage, imageDownloadUrl);
    
    deleteObject(deleteRef).then(() => {
       setImageDownloadUrl(null);
       setIsLoading(false); 

       dispatch(alertSuccess("Image removed from the cloud"));
          setTimeout(()=>{
            dispatch(alertNull());
          }, 3000);   
    });
  };

  const submitNewData = () => {
    const data ={
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadUrl,
    };

    addNewProduct(data).then(res => {
      console.log(res);
      dispatch(alertSuccess("New Item added"));
      setTimeout(()=>{
        dispatch(alertNull());
      }, 3000); 
      setImageDownloadUrl(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    });

    getAllProducts().then(data =>{
      dispatch(setAllProducts(data))
    });    
  };


  return (
    <div className='flex items-center justify-center flex-col pt-6 px-24 w-full'>
      <div className='border border-gray3 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
        <InputValueField 
          type="text"
          placeHolder={"Item name here"}
          stateFunc={setItemName}
          stateValue={itemName}
        />
          <div className='w-full flex items-center justify-around gap-3 flex-wrap  '>
            {statuses && statuses.map(data => (
              <p 
              key={data.id} 
              onClick={() => setCategory(data.category)}
              className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray2 backdrop-blur-md ${data.category===category ? "bg-green5 text-primary" : "bg-transparent"}`}
              >
                {data.title}

              </p>
              
            ))}
          </div>
          <InputValueField 
          type="number"
          placeHolder={"Item price here"}
          stateFunc={setPrice}
          stateValue={price}
          />  

          <div className='w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray3 cursor-pointer '>
              {isloading ?
               (
               <div className='w-full h-full flex flex-col items-center justify-evenly px-24 '>
                <Spinner />
                {Math.round(progress > 0) && (
                  <div className='w-full flex flex-col items-center justify-center gap-2' >
                    <div className='flex justify-center w-full'>
                      <span className='text-base font-medium text-textColor'>
                        Progress
                      </span>
                      <span className='text-base font-medium text-textColor '>
                        {Math.round(progress) > 0 && (
                          <>{`${Math.round(progress)}%`}</>
                        )}
                      </span>
                    </div>

                    <div className='w-full bg-gray2 rounded-full h-2.5'> 
                      <div className='bg-green6 h-2.5 rounded-full transition-all duration-300 ease-in-out'
                        style={{width:`${Math.round(progress)}%`}}
                      ></div>
                        
                    </div>

                  </div>
                )}
                </div>
                ):(
               <>
               {!imageDownloadUrl ? (
                 <>
                  <label>
                    <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                      <div className='flex flex-col justify-center items-center cursor-pointer'>
                        <p className='font-bold text-4xl'>
                          <FaCloudUploadAlt className='-rotate-0'/>
                        </p>
                        <p className='text-lg text-textColor'>
                          Click to upload an image
                        </p>

                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    /> 
                  </label>
                 </>
               ) : (
                <>
                  <div className='relative w-full h-full overflow-hidden rounded-md'>
                    <motion.img
                      whileHover={{scale:1.15}}
                      src={imageDownloadUrl}
                      className='w-full h-full object-cover'
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red5 text-xl cursor-pointer outline-none hover:shadow-md dration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFormFirebase(imageDownloadUrl)}
                    >
                        <MdDelete className='-rotate-0' />
                    </motion.button>
                  </div>
                </>
               )}
               </>
              )
              }
          </div>

          <motion.button
            onClick={submitNewData}
            {...buttonClick}
            className='w-9/12 py-2 rounded-md bg-green5 text-primary hover:bg-green6 cursor-pointer'
            >
              Save

              
          </motion.button>


        </div>
    </div>
  );
};



export const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) =>{
  return (
  <>
    <input 
      type={type}
      placeholder={placeHolder}
      className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray2 focus:border-red4"
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}

    />
  </>
  );
}
export default DBNewIteam