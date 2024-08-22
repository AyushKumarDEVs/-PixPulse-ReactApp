import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabasesServices from "../appwrite/configureappwrite";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/container/Container";
import Button from "../components/Button";
import parse from "html-react-parser";
import Loading from "../components/Loading";
import UserServices from "../appwrite/UserServices";
import { setAllActivePosts, setAllPosts } from "../features/PostsSlice";
import { setuserposts } from "../features/authslice";

function Post() {
  const { slug } = useParams();
  const [post, setpost] = useState({});
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth).userdata;
  const auth=useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const postslice = useSelector((state) => state.postslice);

  const [loading, setloading] = useState(true);
  const [profiledata, setprofiledata] = useState({});
  console.log(userdata);
  let isauthor = post && userdata ? post.userid === userdata.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/home");
    } else
      try {
        DatabasesServices.GetPost(slug)
          .then((data) => {
            if (data) {
              setpost(data);
              isauthor =
                post && userdata ? post.userid === userdata.$id : false;
              UserServices.getProfile(data.userid)
                .then((data) => {
                  if (data) {
                    setprofiledata(data);
                    console.log("j");
                    setloading(false);
                  }
                })
                .catch((e) => console.log(e));
            } else {
              navigate("/home");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("error in geting post" + error);
      }
  }, [slug, navigate]);

  const DeletePost = () => {
    if (post) {
      DatabasesServices.DeletePost(post.$id)
        .then((deletedpost) => {
          if (deletedpost) {
            const deletedfile = DatabasesServices.DeleteFile(post.articleimage);
            if (deletedfile) {
              dispatch(
                setuserposts({
                  userposts: auth.usserposts.filter(
                    (each) => each.$id != post.$id
                  ),
                })
              );

              if (post.status === "active") {
                dispatch(
                  setAllActivePosts({
                    AllActivePosts: postslice.AllActivePosts.filter(
                      (each) => each.$id != post.$id
                    ),
                  })
                );
                dispatch(
                  setAllPosts({
                    AllPosts: postslice.AllPosts.filter(
                      (each) => each.$id != post.$id
                    ),
                  })
                );
                navigate("/home");
              } else {
                dispatch(
                  setAllPosts({
                    AllPosts: postslice.AllPosts.filter(
                      (each) => each.$id != post.$id
                    ),
                  })
                );
                navigate("/home");
              }
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const EditPost = () => {
    if (post) {
      navigate(`/editpost/${post.$id}`);
    }
  };

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  } else {
    return post ? (
      <Container>
        <div className="flex gap-2 p-3 rounded-md mb-2  h-full flex-col bg-indigo-950">
          {isauthor && (
            <div className="">
              <Link>
                <Button
                  bgColor="bg-green-500"
                  onClick={EditPost}
                  className="mr-3"
                >
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={DeletePost}>
                Delete
              </Button>
            </div>
          )}
          <Link
            className="flex gap-2 items-center"
            to={`/profile/${post.userid}`}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={UserServices.PreviewProfilePhoto(profiledata.profilephoto)}
              alt=""
            />
            <h1 className="text-lg text-white font-bold ">
              {profiledata ? profiledata.username : "profile not found"}
            </h1>
          </Link>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={DatabasesServices.PreviewFile(post.articleimage)}
              alt={post.title}
              className="rounded-xl w-64 h-64"
            />
          </div>
          <div className="flex flex-col gap-3 text-white sm:flex-row">
            <div className="w-full">
              <h1 className="text-2xl font-bold w-72 overflow-x-scroll">{post.title}</h1>
            </div>
            <div className=" overflow-y-scroll h-52 ">
              {parse(String(post.content))}
            </div>
          </div>
        </div>
      </Container>
    ) : null;
  }
}

export default Post;
