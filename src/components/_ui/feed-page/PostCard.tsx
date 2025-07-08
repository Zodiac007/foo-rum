import { CommentIcon, HeartIcon, ShareIcon } from "../../../assets/icons";
import userImage from "../../../assets/images/user-image.png";
interface IPostCardProps {
  post: string;
  handleInteract: () => void;
  data?: {
    id: string;
    name: string;
    posted_time: string;
    emoji: string;
    profile_picture: string;
  };
}

export default function PostCard({
  data,
  post,
  handleInteract,
}: IPostCardProps) {
  return (
    <div className="bg-[#00000008] rounded-[21px] p-2 pb-4 mb-4 ">
      <div className="bg-white p-4 rounded-[18px] flex flex-col gap-3">
        <div className="flex items-center gap-x-3">
          <img
            src={data?.profile_picture ?? userImage}
            alt={`user-image-${data?.id}`}
            height={38}
            width={38}
          />
          <div>
            <h3 className="text-[13px] font-semibold text-black">
              {data?.name ?? "Theresa Webb"}
            </h3>
            <p className="text-xs font-medium text-black/35">
              {data?.posted_time ?? "5 mins ago"}
            </p>
          </div>
        </div>

        <div className="flex gap-x-3">
          <div className="h-9.5 w-9.5 bg-[#f2f2f2] rounded-full p-2 inline-block">
            {data?.emoji ?? "🥴"}
          </div>
          <p className="mb-3 text-sm text-black/85 font-medium line-clamp-3 sm:line-clamp-5">
            {post}
          </p>
        </div>
      </div>

      {/* icons */}
      <div className="flex items-center gap-x-6 mt-4 ml-4">
        <button onClick={handleInteract} className="cursor-pointer">
          <HeartIcon />
        </button>
        <button onClick={handleInteract} className="cursor-pointer">
          <CommentIcon />
        </button>
        <button onClick={handleInteract} className="cursor-pointer">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}
