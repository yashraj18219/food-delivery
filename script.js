// const heading = document.createElement("h1");
//  heading.innerText = `Hello world from JS`;
// const root = document.querySelector("#root");
// root.appendChild(heading);

 const heading = React.createElement("h1",{},"Hello world from React");
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(heading);