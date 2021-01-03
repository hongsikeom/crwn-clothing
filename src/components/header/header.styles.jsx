import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const MainContainer = styled(Link)`
    font-size: 35px;
    margin: auto;
    color: grey;
    text-align: left;
    cursor: pointer;
`;


export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    margin-left: 100px;
    padding: 15px;
`;


export const OptionsContainer = styled.div`
    margin-right: 100px;
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 18px;
`;


// Use duplicate styles
export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`;
