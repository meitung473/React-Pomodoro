import { createGlobalStyle } from "styled-components";
import { br } from "./device";

export const GlobalStyle = createGlobalStyle`
    html,body{
    height: 100%;
    font-family: 'Noto Sans TC', sans-serif;
    }
    body,ul,ol,h1,h2,h3{
    margin: 0;
    padding: 0;
    }
   
    #root{
        height: 100vh;
        display: flex;
        flex-direction: column;
        ${br.md}{
            height: 100%;
            display: flex;
            flex-direction: row;
        }
    }
`;
