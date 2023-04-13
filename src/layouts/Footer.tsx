import styled from "styled-components";

const Footer = () => {
	return (
		<FooterSection>
			<h3>copyright@ rlawlsdnjs - github</h3>
		</FooterSection>
	);
};

const FooterSection = styled.footer`
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	min-height: 50px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-item: center;
`;

export default Footer;
