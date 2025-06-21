import { Link } from "react-router";

const LeaveReview = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">
        💬 Have Feedback?
      </h3>
      <p className="text-gray-600 mb-6">
        We'd love to hear how the app is helping you! Share your thoughts with
        us.
      </p>
      <Link
        to={"/feedback"}
        className="inline-block bg-[#1B5E20] text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
      >
        ✍️ Leave a Review
      </Link>
    </div>
  );
};

export default LeaveReview;
