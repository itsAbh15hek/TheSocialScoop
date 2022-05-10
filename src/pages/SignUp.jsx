import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import heroDark from "../assets/heroDark.png";
import heroLight from "../assets/heroLight.png";
import { publicRequest } from "../requestMethods";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import Form from "../components/Sign Up/Form";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const MainContainer = styled.span`
  background: ${(props) =>
    props.themeCurrent === "dark"
      ? `rgba(${props.theme.bodyRgba},.3)`
      : `rgba(${props.theme.bodyRgba},.3)`};
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  height: 90%;
  width: 90%;
  padding: 30px 50px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;

  @media (max-width: 1300px) {
    padding: 30px;
  }
  @media (max-width: 1000px) {
    margin-left: 0;
    width: calc(100% - 60px);
    margin-bottom: 20px;
    overflow-y: scroll;
  }
`;
const ImageSectionWrapper = styled.div`
  height: 100%;
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
  }
  @media (max-width: 1300px) {
    width: 30%;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const SignUp = ({ themeCurrent, setUser }) => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  const [file, setFile] = useState({});
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ||||||||||||||||||||||||||||||||||||||||||||||||||

    try {
      const fileName = new Date().getTime() + file.name;

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);

            await setUserData((p) => ({ ...p, profilePicture: downloadURL }));
          });
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const submit = async () => {
      userData.profilePicture && console.log(userData);
      userData.profilePicture &&
        (await publicRequest.post("/auth/signup", { ...userData }));

      userData.profilePicture &&
        login(dispatch, {
          username: userData.username,
          password: userData.password,
        });
    };
    submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.profilePicture]);

  return (
    <>
      <NavBar themeCurrent={themeCurrent} />
      <MainContainer themeCurrent={themeCurrent}>
        <ImageSectionWrapper>
          <img
            src={themeCurrent === "dark" ? heroDark : heroLight}
            alt="the social scoop logo"
          />
        </ImageSectionWrapper>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          userData={userData}
          setFile={setFile}
        />
      </MainContainer>
    </>
  );
};

export default SignUp;
