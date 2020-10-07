import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

   body {
     background: #121214;
     color: #fff;
     font-family: Roboto, Arial, Helvetica, sans-serif;
   }

   a {
     color: #d9d9d9;
   }

   ul {
     li {
       transition: transform .3s ease;
       &:hover {
         transform: translateX(10px);
       }
     }
   }

   img {
     object-fit: cover;
     object-position: center;
   }
`;
