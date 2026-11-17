"use strict";
const PAGE_SIZE = 5;
let students = [];
let page = 1;

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

function visible() {
  const q = $("#search").val().trim().toLowerCase();
  const dept = $("#dept").val();
  return students.filter(function (s) {
    return (!dept || s.department === dept) &&
      (!q || (s.name + " " + s.email).toLowerCase().includes(q));
  });
}

function renderPager(pages) {
  const ul = $("#pager").empty();
  for (let p = 1; p <= pages; p++) {
    const btn = $("<button>").addClass("page-link").attr("type", "button").text(p).data("page", p);
    ul.append($("<li>").addClass("page-item" + (p === page ? " active" : "")).append(btn));
  }
}

function fillDepartments() {
  const sel = $("#dept");
  const keep = sel.val();
  sel.find("option:not(:first)").remove();
  Array.from(new Set(students.map(function (s) { return s.department; }))).sort()
    .forEach(function (d) { sel.append($("<option>").val(d).text(d)); });
  sel.val(keep);
}

function render() {
  const list = visible();
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  page = Math.min(page, pages);
  setState(list.length ? "data" : "empty");
  renderRows(list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE));
  renderPager(pages);
  $("#count").text("Showing " + list.length + " of " + students.length + " students");
}

function onLoaded() { fillDepartments(); render(); }

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

/* Request 2: jQuery AJAX */
function loadStats() {
  $("#stats-error").addClass("d-none");
  return $.ajax({ url: "data/stats.json", dataType: "json", cache: false })
    .done(function (stats) {
      $("#s-total").text(stats.totalStudents);
      $("#s-depts").text(stats.departments);
      $("#s-sem").text(stats.averageSemester);
      $("#s-courses").text(stats.activeCourses);
    })
    .fail(function (xhr, status) {
      $("#stats-error").removeClass("d-none")
        .text("Could not load summary numbers (" + status + "). Check data/stats.json.");
    });
}

$(function () {
  loadStudents();
  loadStats();
  $("#retry").on("click", loadStudents);
  $("#search, #dept").on("input change", function () { page = 1; render(); });
  $("#pager").on("click", "button", function () { page = $(this).data("page"); render(); });
});
