const signature = document.querySelector("#signature");
const verify = document.querySelector("#verify");


    if (window.location.pathname === '/') {
        console.log(window.location.pathname);
        signature.classList.remove("border-slate-700");
        signature.classList.add("border-blue-500");
        verify.classList.remove("border-blue-500");
        verify.classList.add("border-slate-700");
    } else {
        signature.classList.remove("border-blue-500");
        signature.classList.add("border-slate-700");
        verify.classList.remove("border-slate-700");
        verify.classList.add("border-blue-500");
        console.log(window.location.pathname);

    }