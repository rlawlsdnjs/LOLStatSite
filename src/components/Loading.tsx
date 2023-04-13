import styled from "styled-components";
import LoadingImg from "../../public/assets/loading.gif";
const Loading = () => {
	return (
		<LoadingWrap>
			<div>
				<img src={LoadingImg}></img>
			</div>
		</LoadingWrap>
	);
};

const LoadingWrap = styled.div`
	position: fixed;
	z-index: 999;
	left: 50%;
	top: 50%;
	width: 100%;
	height: 100%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	& img {
		max-width: 150px;
	}
`;

export default Loading;
