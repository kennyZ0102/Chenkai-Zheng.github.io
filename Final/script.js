// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiemNrMDAwMTAyIiwiYSI6ImNscjZkdm1sdTF1NmQya215ZXd0aWlnZnUifQ.P720ZG24ZTqUmRmxuihmgA";
const style_0010 = "mapbox://styles/zck000102/cls08465n00w601pegsaof2k2";
const style_1020 = "mapbox://styles/zck000102/cls088nz400ce01qqfu5lb4xq";

const map = new mapboxgl.Map({
  container: "map",
  style: style_0010,
  center: [108, 37], // change to your centre
  zoom: 3
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_0010") {
      map.setStyle(style_0010);
      
    }
    if (layer.target.id == "style_1020") {
      map.setStyle(style_1020);
    }
  };
}

map.on("load", () => {
  const layers = [
    "-20%~-10%",
    "-10%~0%",
    "0%~10%",
    "10%~20%",
    "20%~30%",
    ">30%",
  ];
  const colors = [
    "#bfbfbf",
    "#3288bd",
    "#ffffbf",
    "#fee08b",
    "#fc8d59",
    "#d53e4f",
  ];
  // create legend
  const legend = document.getElementById("legend");

  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");
    //place holder
    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;

    legend.appendChild(key);
    key.style.color = "rgba(40, 40, 40, 0.8)";
  });
});



let popup; // 用于保存弹窗对象

// 处理 pop-change-0010 图层的悬停效果
map.on("mousemove", "pop-change-0010", (e) => {
  const features = map.queryRenderedFeatures(e.point, { layers: ["pop-change-0010"] });

  if (features.length > 0) {
    const feature = features[0];
    const coordinates = e.lngLat;

    // 关闭之前的弹窗
    if (popup) {
      popup.remove();
    }

    popup = new mapboxgl.Popup({
    className: 'custom-popup'
  })
      .setLngLat(coordinates)
      .setHTML(`
        <h3>Province: ${feature.properties.name}</h3>
        <p>Growth Number: <strong>${feature.properties.Num_0010 * 10000}</strong></p>
        <p>Growth Rate: <strong>${(feature.properties.Per_0010 * 100).toFixed(2) + '%'}</strong></p>
      `)
      .addTo(map);
  } else {
    map.getCanvas().style.cursor = "";
    // 如果鼠标移出图层范围，也需要关闭弹窗
    if (popup) {
      popup.remove();
    }
  }
});

// 处理 pop-change-1020 图层的悬停效果
map.on("mousemove", "pop-change-1020", (e) => {
  const features = map.queryRenderedFeatures(e.point, { layers: ["pop-change-1020"] });

  if (features.length > 0) {
    const feature = features[0];
    const coordinates = e.lngLat;

    // 关闭之前的弹窗
    if (popup) {
      popup.remove();
    }

    popup = new mapboxgl.Popup({
    className: 'custom-popup'
  })
    
      .setLngLat(coordinates)
      .setHTML(`
        <h3>Province: ${feature.properties.name}</h3>
        <p>Growth Number: <strong>${feature.properties.Num_1020 * 10000}</strong></p>
        <p>Growth Rate: <strong>${(feature.properties.Per_1020 * 100).toFixed(2) + '%'}</strong></p>
      `)
      .addTo(map);
  } else {
    map.getCanvas().style.cursor = "";
    // 如果鼠标移出图层范围，也需要关闭弹窗
    if (popup) {
      popup.remove();
    }
  }
});

// 当鼠标离开 pop-change-0010 图层时关闭弹出窗口
map.on("mouseleave", "pop-change-0010", () => {
  map.getCanvas().style.cursor = "";
  if (popup) {
    popup.remove();
  }
});

// 当鼠标离开 pop-change-1020 图层时关闭弹出窗口
map.on("mouseleave", "pop-change-1020", () => {
  map.getCanvas().style.cursor = "";
  if (popup) {
    popup.remove();
  }
});

map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

map.addControl(new mapboxgl.ScaleControl());