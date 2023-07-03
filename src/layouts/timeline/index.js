import { useParams } from "react-router-dom";
import VideoCallPage from "./VideoCallPage";
import PageLayout from "examples/LayoutContainers/PageLayout";

function VideoCall() {
  const { id: meetingId } = useParams();
  return (
    <PageLayout>
      <VideoCallPage meetingId={meetingId} />
    </PageLayout>
  );
}

export default VideoCall;
