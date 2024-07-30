import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatabasesServices from "../appwrite/configureappwrite";
import Input from "./Input";
import RTE from "./RTE.jsx";
import Select from "./Select.jsx";
import Button from "./Button.jsx";
import { ID } from "appwrite";
import Loading from "./Loading.jsx";
import Container from "./container/Container.jsx";
import { setAllActivePosts, setAllPosts } from "../features/PostsSlice.js";
import { setuserposts } from "../features/authslice.js";

export default function PostForm({ post, slug }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useForm({});

  const navigate = useNavigate();
  const userData = (useSelector((state) => state.auth)).userdata;
  const usserposts = (useSelector((state) => state.auth)).usserposts;

  const postslice = (useSelector((state) => state.postslice));
  const dispatch=useDispatch();

  const [loading, setloading] = useState(true);
  const [Image, setImage] = useState(null);
  const date = new Date();
  console.log(userData);

  const submit = async (data) => {
    setloading(true);
    if (post) {

      try {
        const dbPost = await DatabasesServices.UpdatePost({
          slug: post.$id,
          articleimage: post.articleimage,
          ...data,
        });

        if (dbPost) {
          setloading(false);
          navigate(`/post/${dbPost.$id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const file = data.image[0]
        ? await DatabasesServices.CreateFile(data.image[0])
        : false;
      if (file) {
        try {
          let slug = data.title + ID.unique();
          const dbPost = await DatabasesServices.CreatePost({
            userid: userData.$id,
            articleimage: file.$id,
            slug: slug,
            ...data,
          });
          if (dbPost) {
            setloading(false);
            dispatch(setuserposts({userposts:[dbPost,...usserposts]}));
            if(data.status==="active"){
              dispatch(setAllActivePosts({AllActivePosts:[dbPost,...postslice.AllActivePosts]}));
              dispatch(setAllPosts({AllPosts:[dbPost,...postslice.AllPosts]}));

            }else{
              dispatch(setAllPosts({AllPosts:[dbPost,...postslice.AllPosts]}));

            }
            navigate(`/post/${dbPost.$id}`);
          } else {
            setloading(false);

            console.log("post creation error");
          }
        } catch (error) {
          setloading(false);

          console.log(error);
        }
      } else {
        setloading(false);

        console.log("file creation error");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  React.useEffect(() => {
    if (post) {
      console.log(post.content);
      setValue("title", post.title);
      setValue("content", post.content);
      setloading(false);
    } else {
      setloading(false);
    }
  }, [post]);
  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else
    return (
      <form
        onSubmit={handleSubmit(submit)}
        className="flex  gap-10 h-full  flex-col overflow-y-scroll items-center p-5 text-white"
      >
        <div className="w-fit px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 w-input"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-800">This field is required</span>
          )}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={post ? post.content : `${date.toDateString()}`}
          />
        </div>
        
        <div className="w-fit px-2 flex flex-col gap-4">
          <div className="w-fit flex flex-col gap-3 items-center">
            <div>

              {
                post? 
                (
                  null
                )
                :
                (
                  <>
                   <Input
                  label="Featured Image :"
                  type="file"
                  className="mb-4 w-input"
                  onInput={(e) => handleImageChange(e)}
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                />

                {errors.image && (
                  <span className="text-red-800">This field is required</span>
                )}
                  
                  </>
                 
    
               
               
                )
              }
           
            </div>
           

            <div className="">
            { post&&!Image? 
            (
                
                        <img
                            src={DatabasesServices.PreviewFile(post.articleimage)}
                            alt={post.title}
                            className="w-32 h-32"
                        />
            )
            :
            (
                (Image ? (
                    <img className="w-32 h-32" src={Image} alt="preview" />
                  ) : null)
            )}
            </div>
          </div>

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    );
}
