import { Fragment, useEffect, useState } from "react";

import { db, storage } from "../../firebase-config";
import { collection, doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "@firebase/storage";

import { useHistory, useParams } from "react-router-dom";

import Header from "../Header/Header";

import "./EditProductForm.css";


const EditProductForm = () => {
  const [formData, setFormData] = useState({});
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const productCollectionRef = collection(db, "products");

  const { productId } = useParams();

  //get given product id
  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(productCollectionRef);
      const list = data.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      const filteredList = list.filter((product) => {
        return product.id === productId;
      });
      const product = filteredList[0];
      setFormData({ ...product });
    };
    getProduct();
  }, []);

  //update database with new info
  const updateProduct = async (e) => {
    e.preventDefault();
    const productDoc = doc(db, "products", formData.id);
    updateDoc(productDoc, formData).then(() => {
      history.push("/inventory");
    });
  };
  
    //update form state
  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const uploadImage = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `/ProductIamges/${file.name}`);

    if (formData.ImgUrl !== "") {
      const desertRef = ref(storage, getPathStorageFromUrl(formData.ImgUrl));
      deleteObject(desertRef)
        .then(() => {
          console.log("Deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData((prevState) => ({ ...prevState, ImgUrl: url }));
        });
      }
    );
  };

  //Delete product from database
  const deleteProduct = async () => {
    const productDoc = doc(db, "products", productId);
    await deleteDoc(productDoc);
    history.push("/inventory");
  } 
  
  //URL string manipulation to change certain image in firebase 
  const getPathStorageFromUrl = (url) => {
    const baseUrl = process.env.REACT_APP_URL;
    let imagePath = url.replace(baseUrl, "");
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = imagePath.replace("%2F", "/");
    return imagePath;
  };

  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  return (
    <Fragment>
      <Header />
      <h1 className="title-header">Update Product</h1>
      <form className="add-form" onSubmit={updateProduct}>
        <input
          autocomplete="off"
          name="name"
          onChange={onChangeHandler}
          className="text-input"
          placeholder={formData.name}
        ></input>
        <input
          autocomplete="off"
          name="price"
          onChange={onChangeHandler}
          className="text-input"
          placeholder={formData.price}
        ></input>
        <input
          autocomplete="off"
          name="cost"
          onChange={onChangeHandler}
          className="text-input"
          placeholder={formData.cost}
        ></input>
        <input
          autocomplete="off"
          name="upc"
          onChange={onChangeHandler}
          className="text-input"
          placeholder={formData.upc}
        ></input>
        <input
          autocomplete="off"
          name="onHand"
          onChange={onChangeHandler}
          className="text-input"
          placeholder={formData.onHand}
        ></input>
        <input onChange={onChangeFileHandler} name="file" type="file"></input>
        <div className="catagory-container">
          <p>Article Catagory</p>
          <select defaultValue="-" name="catagory" onChange={onChangeHandler}>
          <option value="-"></option>
            <option>MALE SHIRTS</option>
            <option>MALE PANTS</option>
            <option>MALE SOCKS</option>
            <option>FEMALE SHIRTS</option>
            <option>FEMALE PANTS</option>
            <option>FEMALE SOCKS</option>
            <option>BABY SHIRTS</option>
            <option>BABY PANTS</option>
            <option>BABY SOCKS</option>
            <option>KID SHIRTS</option>
            <option>KID PANTS</option>
            <option>KID SOCKS</option>
            <option>NEW CLOTHES</option>
            <option>NEW ARRIVALS</option>
            <option>NEW ACCESSORIES</option>
          </select>
        </div>
        <h3>Uploading... {progress}%</h3>
        <button className="submit-button" type="submit">
          UPDATE PRODUCT
        </button>
        <button className="submit-button" id="delete" type="button" onClick={deleteProduct}>
          DELETE PRODUCT
        </button>
      </form>
    </Fragment>
  );
};

export default EditProductForm;
