import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import usePostComment from "../../Hooks/usePostComment";
import { useEffect, useRef } from "react";
import Comment from "../comment/Comment";

const CommentsModal = ({ isOpen, onClose ,post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null);
    const handleSubmitComment = async(e)=>{
		// to prevent refresh page
         e.preventDefault();
		 await handlePostComment(post.id , commentRef.current.value);
		 commentRef.current.value = "";

	}
 // ** to place the scroll bar at bottom and update it every time when adding a new comment --:>
	useEffect(()=>{},[])

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
					{
						post.comments.map((comment ,idx)=>(
							<Comment comment={comment} key={idx} />
						))
					}
					
					</Flex>
					<form style={{ marginTop: "2rem" }} onSubmit={handleSubmitComment}>
						<Input placeholder='Comment' size={"sm"} ref = {commentRef}/>
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={ isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;