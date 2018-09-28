// callback function
function showEmp(response) {
  // console.log(response);

  // grab headers for table
  let headers = Object.keys(response.employees[0]);
  // console.log(headers);

  // html variables to be inserted later
  let header_html = '<tr><th scope="col">#</th>';
  let body_html = '';

  // write the html for table header
  for (let i = 0; i < headers.length; i++) {
    header_html += '<th scope="col">' + headers[i] + '</th>';
  }

  // close header row
  header_html += '</tr>';

  for (let i = 0; i < response.employees.length; i++) {
    // add new row for each employee
    body_html += '<tr><th scope="row">' + (i + 1) + '</th>';

    for (let j = 0; j < headers.length; j++) {
      // set current header
      let cur_head = headers[j];

      if (cur_head === 'attendance') {
        if (response.employees[i].attendance === true) {
          body_html += '<td class="badge badge-in">IN</td>';
        } else {
          body_html += '<td class="badge badge-out">OUT</td>';
        }
      } else {
        body_html += '<td>' + response.employees[i][`${cur_head}`] + '</td>';
      }
    }

    // end each employee row
    body_html += '</tr>';
  }

  // inserting header_html variable into table-header id
  $("#table-header").html(header_html);

  // inserting body_html variable into table-body id
  $("#table-body").html(body_html);
}

url = './employee.json';

$.get(url,showEmp);
