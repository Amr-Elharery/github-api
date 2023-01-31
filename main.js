
let getData = (apiLink) => {
  return new Promise((resolved, rejected) => {
    let req = new XMLHttpRequest();
    req.onload = function () {
      if (this.status === 200 && this.readyState === 4) {
        resolved(JSON.parse(this.responseText));
      } else {
        rejected(Error("Not Found API"));
      }
    }

    req.open("GET", apiLink);
    req.send();
  });
}

document.forms[0].onsubmit = function (e) {
  getData(`https://api.github.com/users/${user.value}/repos`).then(
    (resolv) => {
      let mainDiv = document.createElement("div");
      mainDiv.id = 'repos';
      let h2 = document.createElement("h2");
      h2.append(document.createTextNode(`${user.value} Repositories`));
      document.forms[0].after(h2)
      for (let i = 0; i < resolv.length; i++) {
        let div = document.createElement("div");
        div.className = 'repo';

        let link = document.createElement("a");
        link.href = `https://github.com/${user.value}/${resolv[i].name}`;
        link.append(document.createTextNode(resolv[i].name));

        div.appendChild(link);
        mainDiv.append(div);
      }
      h2.after(mainDiv);

    }
  )
  e.preventDefault();
}