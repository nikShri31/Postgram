
import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

//***To use the Link with a routing library like Reach Router or React Router, all you need to do is pass the as prop. It'll replace the rendered a tag with Reach's Link.
// <ChakraLink as={ReactRouterLink} to='/home'>

const Home = () => {
	return (
		<Tooltip
			hasArrow
			label={"Home"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				as={RouterLink}
				display={"flex"}
				to={"/"}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<AiFillHome size={25} />

				<Box display={{ base: "none", md: "block" }}> Home </Box>
			</Link>

		</Tooltip>
	)
}

export default Home