import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { storage } from "../App";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const FormData = ({ db }) => {
  const [imgUpload, setImgUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const userRef = collection(db, "users");
  useEffect(() => {
    const querySnapshot = async () => {
      try {
        await getDocs(collection(db, "users")).then((data) => {
          data.forEach((elm) => {
            console.log(elm.data());
          });
          console.log(data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    querySnapshot();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMySubmit = async (values) => {
    // handleUploadImage();
    uploadImgHandle(values);

    console.log(values);
  };

  const uploadImgHandle = async (values) => {
    try {
      const storageRef = ref(storage, `/userimages/${userRef.id}`);
      await uploadBytes(storageRef, imgUpload).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
      });
      const url = await getDownloadURL(storageRef);
      setImgUrl(url);
      console.log("url", url);
      console.log(imgUrl);
      handleAddData(values, url);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleAddData = async (values, url) => {
    try {
      console.log(imgUrl, "imgur;s");
      const docRef = await addDoc(userRef, {
        firstName: values.fname,
        lastName: values.lname,
        email: values.email,
        password: values.password,
        profilePic: url,
      });
      console.log(docRef);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <Container sx={{ bgcolor: "#cfe8fc", minHeight: "50vh" }}>
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid xs={12}>
            <Typography variant={"h2"} textAlign={"center"}>
              Form Data
            </Typography>
          </Grid>

          <form
            onSubmit={handleSubmit(handleMySubmit)}
            style={{
              textaAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Grid
              xs={12}
              style={{
                display: "flex",
                gap: "5px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <TextField
                {...register("profpic", {
                  required: "Profile Pic is required",
                })}
                error={!!errors.profpic}
                helperText={errors?.profpic?.message}
                id="filled-basic"
                // label="First Name"
                variant="filled"
                sx={{ width: "45%" }}
                type="file"
                onChange={(e) => {
                  setImgUpload(e.target.files[0]);
                  // console.log(`${imgUpload} uploaded`);
                }}
              />

              <TextField
                {...register("fname", { required: "first name is required" })}
                error={!!errors.fname}
                helperText={errors?.fname?.message}
                id="filled-basic"
                label="First Name"
                variant="filled"
                sx={{ width: "45%" }}
              />
              <TextField
                {...register("lname", { required: "last name is required" })}
                error={!!errors.lname}
                helperText={errors?.lname?.message}
                id="filled-basic"
                label="Last Name"
                variant="filled"
                sx={{ width: "45%" }}
              />
              <TextField
                {...register("email", { required: "email is required" })}
                error={!!errors.email}
                helperText={errors?.email?.message}
                id="filled-basic"
                label="Email"
                variant="filled"
                sx={{ width: "45%" }}
              />
              <TextField
                {...register("password", { required: "password is required" })}
                error={!!errors.fname}
                helperText={errors?.password?.message}
                id="filled-basic"
                label="Password"
                variant="filled"
                sx={{ width: "45%" }}
                type="password"
              />
            </Grid>

            <Button
              variant="contained"
              type="Submit"
              // endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Container>
    </div>
  );
};

export default FormData;
