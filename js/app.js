"use strict";
let students = [];

function setState(state) {
  $("#loading").toggleClass("d-none", state !== "loading");
  $("#error").toggleClass("d-none", state !== "error");
  $("#empty").toggleClass("d-none", state !== "empty");
  $("#table-wrap").toggleClass("d-none", state !== "data");
}

function renderRows(list) {
  const body = $("#rows").empty();
  list.forEach(function (s) {
    const tr = $("<tr>");
    [s.id, s.name, s.email, s.department, s.semester].forEach(function (v) {
      tr.append($("<td>").text(v));
    });
    body.append(tr);
  });
}

function visible() { return students; }

function render() {
  const list = visible();
  setState(list.length ? "data" : "empty");
  renderRows(list);
}

function onLoaded() { render(); }

/* Request 1: Fetch API */
function loadStudents() {
  setState("loading");
  return fetch("data/sample.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("Request failed (" + response.status + ").");
      return response.json();
    })
    .then(function (data) {
      students = Array.isArray(data.students) ? data.students : [];
      onLoaded();
    })
    .catch(function (error) {
      $("#error-msg").text(error.message);
      setState("error");
    });
}

$(function () {
  loadStudents();
  $("#retry").on("click", loadStudents);
});
