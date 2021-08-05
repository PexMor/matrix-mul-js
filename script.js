// the tool
function subfce() {
    return butfce();
}

function onloadfce() {
    if (window.location.hash) {
        var i0e = document.getElementById("i0");
        var i1e = document.getElementById("i1");
        // Fragment exists
        if (i0e && i1e) {
            const urlParams = new URLSearchParams("?" + window.location.hash.substr(1));
            var i0 = urlParams.get("A");
            var i1 = urlParams.get("B");
            i0e.value = i0;
            i1e.value = i1;
        }
    } else {
        // Fragment doesn't exist
    }
    return butfce();
}

window.onhashchange = onloadfce;

function mathw(val, row, pair, col, pfx) {
    txt = "$" + val + "$"
    txt = `<div class='inner' id='${pfx}_${row}_${pair}_${col}' onmouseover='lbl(1,"${pfx}",${row},${pair},${col})' onmouseout='lbl(0,"${pfx}",${row},${pair},${col})'>` + txt + "</div>"
    return txt
}

function setCol(pfx, row, pair, col, cls_name) {
    id_res = `${pfx}_${row}_${pair}_${col}`
    id0_ix = `si0_${row}_${pair}`
    id1_ix = `si1_${pair}_${col}`
    var id_res_e = document.getElementById(id_res);
    var id0_ix_e = document.getElementById(id0_ix);
    var id1_ix_e = document.getElementById(id1_ix);
    if (id_res_e && id0_ix_e && id1_ix_e) {
        id_res_e.className = cls_name;
        id0_ix_e.className = cls_name;
        id1_ix_e.className = cls_name;
    } else {

    }
}

var last_span;

function lbl(state, pfx, row, pair, col) {
    if (typeof (last_span) !== "undefined") {
        // clean the last cells
        setCol("v", last_span.row, last_span.pair, last_span.col, "inner")
        setCol("n", last_span.row, last_span.pair, last_span.col, "inner")
    }
    if (state > 0) {
        setCol("v", row, pair, col, "hinner")
        setCol("n", row, pair, col, "hinner")
        last_span = {
            pfx: pfx,
            row: row,
            pair: pair,
            col: col
        }
    }
}

function show_sl(hashUrl) {
    var sld = document.getElementById("self-link");
    if (sld) {
        var url = location.protocol + '//' + location.host + location.pathname + hashUrl;
        var html = `Share: <a href="${url}">${url}</a>`
        sld.innerHTML = html;
    }
}

function butfce() {
    var i0e = document.getElementById("i0");
    var i1e = document.getElementById("i1");
    var i0me = document.getElementById("i0m");
    var i1me = document.getElementById("i1m");
    var trge = document.getElementById("trge");
    var trgm = document.getElementById("trgm");
    if (i0e && i1e && i0me && i1me && trge && trgm) {
        // MathJax.startup.document.state(0);
        MathJax.typesetClear();
        // MathJax.texReset();
        // MathJax.typeset();
        MathJax.typesetPromise().then(() => {
            i0 = JSON.parse(i0e.value);
            i1 = JSON.parse(i1e.value);
            var hashUrl = "#A=" + JSON.stringify(i0) + "&B=" + JSON.stringify(i1);
            show_sl(hashUrl);
            var html = "";
            var mx_html = `(${i0.length}:${i0[0].length}) &times; (${i1.length}:${i1[0].length}) = (${i0.length}:${i1[0].length})`
            //trgm.innerHTML = mx_html
            html += "<div style='display: inline-block'><table padding='5' border='1' style='display: inline-block'>"
            // $\begin{bmatrix}a & b\\c & d\end{bmatrix}$
            var html_i0m = "$\\begin{bmatrix}";
            var i0m_rows = [];
            for (var row = 0; row < i0.length; row++) {
                html += "<tr>";
                var i0m_cols = []
                for (var col = 0; col < i0[0].length; col++) {
                    html += `<td id='i0_${row}_${col}'><div class='inner' id='si0_${row}_${col}'>${i0[row][col]}</div></td>`
                    i0m_cols.push(`{${i0[row][col]}}`)
                }
                html += "</tr>";
                i0m_rows.push(i0m_cols.join("&"))
            }
            html_i0m += i0m_rows.join("\\\\")
            html_i0m += "\\end{bmatrix}$"
            i0me.innerHTML = html_i0m
            html += "</table></div>"

            html += " <div style='display: inline-block;font-size:200%'>&nbsp;&times;&nbsp;</div> "

            html += "<div style='display: inline-block'><table padding='5' border='1' style='display: inline-block'>"
            var html_i1m = "$\\begin{bmatrix}";
            var i1m_rows = [];
            for (var row = 0; row < i1.length; row++) {
                html += "<tr>";
                var i1m_cols = []
                for (var col = 0; col < i1[0].length; col++) {
                    html += `<td id='i1_${row}_${col}'><div class='inner' id='si1_${row}_${col}'>${i1[row][col]}</div></td>`
                    i1m_cols.push(`{${i1[row][col]}}`)
                }
                html += "</tr>";
                i1m_rows.push(i1m_cols.join("&"))
            }
            html_i1m += i1m_rows.join("\\\\")
            html_i1m += "\\end{bmatrix}$"
            i1me.innerHTML = html_i1m
            html += "</table></div>"

            html += " <div style='display: inline-block;font-size:200%'>&nbsp;=&nbsp;</div> "

            html += "<div style='display: inline-block'><table padding='5' border='1' style='display: inline-block'>"
            var html_rm = "$\\begin{bmatrix}";
            var rm_rows = [];
            for (var row = 0; row < i0.length; row++) {
                html += "<tr>";
                var rm_cols = []
                for (var col = 0; col < i1[row].length; col++) {
                    res = [
                        [],
                        [], ""
                    ];
                    val = 0;
                    for (var pair = 0; pair < i0[0].length; pair++) {
                        var v0 = i0[row][pair]
                        var v1 = i1[pair][col]
                        res[0].push(mathw(`a_{${row+1},${pair+1}}b_{${pair+1},${col+1}}`, row, pair, col, "v"))
                        res[1].push(mathw(`${v0}\\times${v1}`, row, pair, col, "n"))
                        val += v0 * v1;
                    };
                    res[2] = val
                    var resx = res[0].join(" + ") + "<br>" + res[1].join(" + ") + "<br>" + res[2]
                    html += `<td id='res_${row}_${col}' onmouseover='return resfce(${row},${col})'>${resx}</td>`
                    rm_cols.push(`{${val}}`)
                }
                html += "</tr>";
                rm_rows.push(rm_cols.join("&"))
            }
            html += "</table></div>"
            html_rm += rm_rows.join("\\\\")
            html_rm += "\\end{bmatrix}$"

            trgm.innerHTML = "Shape: " + mx_html + "<br/><br/><div class='middle'>" + html_i0m + "x" + html_i1m + "=" + html_rm + "</div>"

            trge.innerHTML = html;
            MathJax.typesetPromise();
        }).catch((err) => {
            /*console.log(err.message)*/
        });
    }
    // prevent sending to server
    return false
}
var last_el;

function resfce(row, col) {
    var el = document.getElementById(`res_${row}_${col}`);
    if (el) {
        if (typeof (last_el) !== "undefined") {
            var tmp_el = document.getElementById(`res_${last_el.row}_${last_el.col}`);
            tmp_el.style.backgroundColor = "";
            // highlight the row in first matrix
            for (var pair = 0; pair < i0[0].length; pair++) {
                var id0ix = `i0_${last_el.row}_${pair}`
                var id1ix = `i1_${pair}_${last_el.col}`
                var tmp_el = document.getElementById(id0ix);
                tmp_el.style.backgroundColor = "";
                var tmp_el = document.getElementById(id1ix);
                tmp_el.style.backgroundColor = "";
            }
        }
        bg_col = "#cfc"
        el.style.backgroundColor = bg_col;
        for (var pair = 0; pair < i0[0].length; pair++) {
            var id0ix = `i0_${row}_${pair}`
            var id1ix = `i1_${pair}_${col}`
            var tmp_el = document.getElementById(id0ix);
            tmp_el.style.backgroundColor = bg_col;
            var tmp_el = document.getElementById(id1ix);
            tmp_el.style.backgroundColor = bg_col;
        }
        last_el = {
            row: row,
            col: col
        };
    }
}