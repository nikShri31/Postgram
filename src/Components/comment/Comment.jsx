
import useGetUserProfileById from "../../Hooks/useGetUserProfilebyId";
import { Link } from "react-router-dom";
import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      {/*Avatar */}
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={"sm"}/>
      </Link>
      <Flex direction={'column'}>
         <Flex gap={2} alignItems={"center"}>

          {/*Username */}
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}> {userProfile.username} </Text>
          </Link>

          {/*Comment */}
          <Text fontSize={14}>{comment.comment}</Text>
        </Flex>

        <Text fontSize={12} color={"gray"}>
          {/* time ago */}
          {timeAgo(comment.createdAt)}
        </Text>
      </Flex>
    </Flex>
  )
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w='10' />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={100} />
      </Flex>
    </Flex>
  );
};