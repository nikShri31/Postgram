import React, { useRef, useState } from 'react';
//constants logos
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/Constants';
import usePostComment from '../../Hooks/usePostComment';
import CommentsModal from '../Modals/CommentsModal';
import useAuthStore from '../../store/authStore';
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react';
import useLikePost from '../../Hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';


const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null)    // reference variable
  const authUser = useAuthStore(state => state.user);
  const { likes, isLiked, handleLikePost } = useLikePost(post)   // useLike Hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };



  return (
    
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()} >
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes}Likes
      </Text>

      {
        isProfilePage && (
          <Text fontSize='12' color={"gray"}>
            posted {timeAgo(post.createdAt)}
          </Text>
        )}

      {  // Home Page 
        !isProfilePage && (
        <>
            <Text fontSize='sm' fontWeight={700}>
              {creatorProfile.username} {""}
              <Text as='span' fontWeight={400}>
                {post.caption}
              </Text>
            </Text>
            {post.comments.length > 0 && (
              <Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
                View all {post.comments.length} comments
              </Text>
            )}
            {
               isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
                      : null
            }
          </>
        )
      }


      {
        authUser && (
          <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
            <InputGroup>
              <Input
                varient={'flushed'}
                fontSize={14}
                value={comment}
                placeholder={'Add a Comment..'}
                ref={commentRef}
                onChange={(e) => setComment(e.target.value)}
              />
              <InputRightElement>
                <Button
                  fontSize={14}
                  color={"blue.500"}
                  fontWeight={600}
                  cursor={"pointer"}
                  _hover={{ color: "white" }}
                  bg={"transparent"}
                  isLoading={isCommenting}
                  onClick={handleSubmitComment}
                >
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>

          </Flex>

        )
      }

    </Box>
    
  )
}

export default PostFooter;


//CommentLogo component is a custom component rendering an icon or logo for comments,
//clicking on this rendered element (the comment box) should set focus on the element referenced by commentRef.current.