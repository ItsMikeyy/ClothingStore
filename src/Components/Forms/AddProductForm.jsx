import { Fragment, useState } from "react";

import { db, storage } from "../../firebase-config"
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";

import { useHistory } from "react-router-dom";

import Header from "../Header/Header"

import "./AddProductForm.css";


const AddProductForm = () => {
  const [formData, setFormData] = useState({});
  const [imgData, setImgData] = useState({});
  const [progress, setProgress] = useState(0);

  const history = useHistory();

  const productCollectionRef = collection(db, "products");

  const createProduct = async (e) => {
    e.preventDefault();
    uploadImage(imgData.file);
  };

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

  const onChangeFileHandler = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setImgData((prevState) => {
      return { ...prevState, [name]: file };
    });
  };

  if (formData.ImgUrl) {
    addDoc(productCollectionRef, formData).then(() => {
      history.push("/inventory");
    });
  }

  return (
    <Fragment>
      <Header />
      <h1 className="title-header">Add Product</h1>
      <form className="add-form" onSubmit={createProduct}>
        <input
          name="name"
          onChange={onChangeHandler}
          className="text-input"
          placeholder="Article Name"
        ></input>
        <input
          name="price"
          onChange={onChangeHandler}
          className="text-input"
          placeholder="Article Price"
        ></input>
        <input
          name="cost"
          onChange={onChangeHandler}
          className="text-input"
          placeholder="Article Cost"
        ></input>
        <input
          name="upc"
          onChange={onChangeHandler}
          className="text-input"
          placeholder="Article UPC"
        ></input>
        <input
          name="onHand"
          onChange={onChangeHandler}
          className="text-input"
          placeholder="Article OnHand"
        ></input>
        <input onChange={onChangeFileHandler} name="file" type="file"></input>
        <div className="catagory-container">
          <p>Article Catagory</p>
          <select name="catagory" onChange={onChangeHandler}>
            <option>MALE SHIRTS</option>
            <option>MALE PANTS</option>
            <option>MALE SOCKS</option>
            <option>FEMALE SHIRTS</option>
            <option>FEMALE PANTS</option>
            <option>FEMALE SOCKS</option>
            <option>BABY SHIRTS</option>
            <option>BABY PANTS</option>
            <option>BABY SOCKS</option>
            <option>KIDS SHIRTS</option>
            <option>KIDS PANTS</option>
            <option>KIDS SOCKS</option>
            <option>NEW CLOTHES</option>
            <option>NEW ARRIVALS</option>
            <option>NEW ACCESSORIES</option>
          </select>
        </div>
        <h3>Uploading... {progress}%</h3>
        <button className="submit-button" type="submit">
          ADD PRODUCT
        </button>
      </form>
    </Fragment>
  );
};

export default AddProductForm;
