import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";
import PostCard from "../components/_ui/feed-page/PostCard";
import {
  BoldIcon,
  ChevronIcon,
  CodeIcon,
  DeleteIcon,
  EmojiIcon,
  ItalicIcon,
  MicIcon,
  OrderedListIcon,
  PlusIcon,
  PostArrow,
  QuoteIcon,
  UnderlineIcon,
  UnorderedListIcon,
  VideoIcon,
} from "../assets/icons";
import { dummyPostData } from "../db/data";

export default function Feed() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [newPostText, setNewPostText] = useState("");
  const [posts, setPosts] = useState<string[]>([]);

  useEffect(() => {
    if (location.state?.authModal) {
      setAuthMode(location.state.authModal);
      setShowModal(true);
    }
  }, [location.state]);

  const alertNotImplemented = () => alert("function not implemented");

  const handlePublish = () => {
    if (!newPostText.trim()) {
      alert("Post cannot be empty");
      return;
    }
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    setPosts([newPostText.trim(), ...posts]);
    setNewPostText("");
  };

  const handleInteract = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      alertNotImplemented();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-4">Feed Page</h1> */}
      {!isAuthenticated && (
        <div className="bg-blue-100 p-2 rounded-lg text-center mb-4">
          <p className="text-blue-600 text-xs">
            Please Sign in to Post Anything
          </p>
        </div>
      )}
      {/* Post Editor */}
      <div className="mb-6 bg-[#00000008] rounded-2xl p-4 shadow">
        <div className="bg-white p-2 rounded-2xl">
          {/* Actions of editor */}
          <div className=" flex items-center justify-between">
            <div className="bg-[#00000008] flex flex-wrap sm:flex-nowrap items-center gap-x-5 gap-y-2 sm:gap-x-4 rounded-lg p-1.5 pr-6">
              <button className="bg-white p-2 shadow rounded-lg text-xs flex items-center gap-x-1.5">
                Paragraph
                <ChevronIcon />
              </button>
              <button className="bg-white p-2 shadow rounded-lg">
                <BoldIcon />
              </button>
              <button>
                <ItalicIcon />
              </button>
              <button>
                <UnderlineIcon />
              </button>
              <span className="w-px h-6 bg-black/10 hidden sm:block" />
              <button>
                <UnorderedListIcon />
              </button>
              <button>
                <OrderedListIcon />
              </button>

              <button>
                <QuoteIcon />
              </button>
              <button>
                <CodeIcon />
              </button>
            </div>
            <div className="bg-[#ff0000]/15 p-2.5 rounded-lg">
              <DeleteIcon />
            </div>
          </div>
          <div className="relative">
            <textarea
              className="w-full p-2 rounded mb-2 resize-none text-sm outline-0"
              rows={2}
              // placeholder="How are you feeling today?"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              disabled={!isAuthenticated}
            />
            {newPostText === "" && (
              <div className="absolute top-2 left-3 flex items-center text-gray-400 pointer-events-none text-sm">
                <EmojiIcon />
                <span className="text-sm pl-2">How are you feeling today?</span>
              </div>
            )}
          </div>
          <hr className="border border-gray-100 h-px" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-x-5">
              <button
                onClick={alertNotImplemented}
                className="bg-gray-100 p-2 rounded-xl cursor-pointer"
              >
                <PlusIcon />
              </button>
              <button onClick={alertNotImplemented} className="cursor-pointer">
                <MicIcon />
              </button>
              <button onClick={alertNotImplemented} className="cursor-pointer">
                <VideoIcon />
              </button>
            </div>

            <button onClick={handlePublish} className="cursor-pointer">
              <PostArrow />
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div>
        {/* {posts.length === 0 && (
          <p className="text-gray-500 text-sm text-center mb-4">
            You have not Posted anything yet.
          </p>
        )} */}
        {posts.map((post, index) => (
          <React.Fragment key={index}>
            <PostCard post={post} handleInteract={handleInteract} />
          </React.Fragment>
        ))}

        {dummyPostData.map((postData) => (
          <React.Fragment key={postData.id}>
            <PostCard
              data={postData}
              post={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
              handleInteract={handleInteract}
            />
          </React.Fragment>
        ))}
      </div>

      {showModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowModal(false)}
          switchMode={(mode) => {
            setAuthMode(mode);
            setShowModal(true);
          }}
        />
      )}
    </div>
  );
}
