import { QlikObjects } from "./QlikObjects.js";

const config = {
    host: '81tn0pfk70mvwxf.us.qlikcloud.com',
    prefix: '/',
    port: 443,
    isSecure: true,
    webIntegrationId: 'VGQO-vEXRk9pXLIejSyP8P_EDzvwu8pC' // Reemplaza con tu ID de integración webYOUR_WEB_INTEGRATION_ID
};

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
});

require(['js/qlik'], function (qlik) {
    qlik.on("error", function (error) {
        document.getElementById('popupText').innerHTML += error.message + "<br>";
        document.getElementById('popup').style.display = 'block';
    });
    document.getElementById("closePopup").addEventListener("click", function () {
        document.getElementById('popup').style.display = 'none';
    });

    var app = qlik.openApp('3777338b-8938-452a-b388-6872cb74cc6f', config); // Reemplaza con tu ID de aplicación

    const objects_aggregations = document.querySelector(".objects_aggregations");
    QlikObjects["objects_aggregations"].forEach((object, key) => {

        app.visualization.get(`${object}`)
            .then(function (vis) {

                const div = document.createElement("div");
                div.id = "QVobjects_aggregations" + key;
                div.classList.add("qvobject");
                objects_aggregations.appendChild(div);

                vis.show(`QVobjects_aggregations${key}`);
            })
            .catch(function (error) {
                console.error("Error obteniendo la visualización: ", error);
            });
    });

    const objects_map_graph = document.querySelector(".objects_map_graph");
    app.visualization.get(`${QlikObjects["objects_map"]}`)
        .then(function (vis) {

            const div = document.createElement("div");
            div.id = "QVobjects_map";
            div.classList.add("qvobject");
            div.classList.add("QVobjects_map");
            objects_map_graph.appendChild(div);

            vis.show(`QVobjects_map`);
        })
        .catch(function (error) {
            console.error("Error obteniendo la visualización: ", error);
        });

    app.visualization.get(`${QlikObjects["objects_graph"]}`)
        .then(function (vis) {

            const div = document.createElement("div");
            div.id = "QVobjects_graph";
            div.classList.add("qvobject");
            div.classList.add("QVobjects_graph");
            objects_map_graph.appendChild(div);

            vis.show(`QVobjects_graph`);
        })
        .catch(function (error) {
            console.error("Error obteniendo la visualización: ", error);
        });

    const objects_agg_graph = document.querySelector(".objects_agg_graph");
    QlikObjects["objects_agg_graph"].forEach((object, key) => {

        app.visualization.get(`${object}`)
            .then(function (vis) {

                const div = document.createElement("div");
                div.id = "QVobjects_agg_graph" + key;
                div.classList.add("qvobject");
                div.classList.add("QVobjects_agg_graph");
                objects_agg_graph.appendChild(div);

                vis.show(`QVobjects_agg_graph${key}`);
            })
            .catch(function (error) {
                console.error("Error obteniendo la visualización: ", error);
            });
    });

});