async function loadJsonData() {
  let promise = await fetch("/js/menu_dinamic.json");

  if (!promise.ok) promise = await fetch("/menu-dinamic/js/menu_dinamic.json");

  let data = await promise.json();

  return data;
}

function dinamicMenu(p_json_menu) {
  // creo los elementes nav ul principales
  let nav = document.createElement("nav");
  nav.className = "navigation";

  let ulParent = document.createElement("ul");
  ulParent.className = "nav_list";

  // agrego los li del primer nivel
  for (let name in p_json_menu) {
    let li = document.createElement("li");
    li.className = "menu-item";

    let a = document.createElement("a");
    a.className = "menu-link";
    a.innerText = name;

    li.appendChild(a);

    // creo los elementos del sub menu
    let ul_sub = document.createElement("ul");
    ul_sub.className = "submenu";

    p_json_menu[name].forEach((sub_name) => {
      let li_sub = document.createElement("li");

      let a_sub = document.createElement("a");
      a_sub.innerText = sub_name;

      li_sub.appendChild(a_sub);
      ul_sub.appendChild(li_sub);
    });

    // Si hay sub menu lo agrego al li correcpondiente
    if (ul_sub.children.length !== 0) li.appendChild(ul_sub);

    ulParent.appendChild(li);
  }

  // agrego los elementos creados al element nav y al header_container
  nav.appendChild(ulParent);
  window.header_container.appendChild(nav);
}

loadJsonData().then((json) => {
  dinamicMenu(json);
});
