const scrollbar = new PerfectScrollbar("#cells", {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
});

for (let i = 1; i <= 100; i++) {
    let n = i;
    let ans = "";
    while (n > 0) {
        n--;
        let r = n % 26;
        n = n / 26;
        let t = String.fromCharCode(65 + r);
        ans = t + ans;
    }
    let s = "";
    if (ans.charAt(0) == '@') {
        s = ans.substr(1);
    } else {
        s = ans;
    }
    let div = $("<div></div>").text(s + " ");
    div.addClass("column-name");
    $("#columns").append(div);
    $("#rows").append(`<div class="row-name">${i}</div>`);
}

for (let i = 1; i <= 100; i++) {
    let row = $('<div class="cell-row"></div>');
    for (let j = 1; j <= 100; j++) {
        row.append(`<div id="row-${i}-col-${j}" class="input-cell" contenteditable="false"></div>`);
    }
    $("#cells").append(row);
}

$("#cells").scroll(function (e) {
    $("#columns").scrollLeft(this.scrollLeft);
    $("#rows").scrollTop(this.scrollTop);
});

$(".input-cell").dblclick(function (e) {
    $(this).attr("contenteditable", "true");
    $(this).focus();
});

$(".input-cell").blur(function (e) {
    $(this).attr("contenteditable", "false");
});

function getRowCol(ele) {
    let id = $(ele).attr("id");
    let idArray = id.split("-");
    let rowId = parseInt(idArray[1]);
    let colId = parseInt(idArray[3]);
    return [rowId, colId];
}

function getTopLeftBottomRightCell(rowId, colId) {
    let topCell = $(`#row-${rowId - 1}-col-${colId}`);
    let BottomCell = $(`#row-${rowId + 1}-col-${colId}`);
    let leftCell = $(`#row-${rowId}-col-${colId - 1}`);
    let rightCell = $(`#row-${rowId}-col-${colId + 1}`);
    return [topCell,BottomCell,leftCell,rightCell];
}

$(".input-cell").click(function (e) {
    let [rowId, colId] = getRowCol(this);
    let [topCell,bottomCell,leftCell,rightCell] = getTopLeftBottomRightCell(rowId,colId);
    if($(this).hasClass("selected") && e.ctrlKey){
        unselectCell(this,e,topCell,bottomCell,leftCell,rightCell);
    }
    else{
        selectCell(this,e,topCell,bottomCell,leftCell,rightCell);
    }
});

function selectCell(currcell, e, topCell, bottomCell, leftCell, rightCell) {
    if (e.ctrlKey) {
        let topSelected;
        if (topCell) {
            topSelected = topCell.hasClass("selected");
        }
        let botSelected;
        if (bottomCell) {
            botSelected = bottomCell.hasClass("selected");
        }
        let leftSelected;
        if (leftCell) {
            leftSelected = leftCell.hasClass("selected");
        }
        let rightSelected;
        if (rightCell) {
            rightSelected = rightCell.hasClass("selected");
        }

        if (topSelected) {
            $(currcell).addClass("top-selected");
            topCell.addClass("bottom-selected")
        }

        if (rightSelected) {
            $(currcell).addClass("right-selected");
            rightCell.addClass("left-selected");
        }

        if (leftSelected) {
            $(currcell).addClass("left-selected");
            leftCell.addClass("right-selected");
        }

        if (botSelected) {
            $(currcell).addClass("bottom-selected");
            bottomCell.addClass("top-selected");
        }
    } else {
        $(".input-cell.selected").removeClass("selected top-selected bottom-selected left-selected right-selected");
    }
    $(currcell).addClass("selected");
}

function unselectCell(currcell,e,topCell,bottomCell,leftCell,rightCell){
    if($(currcell).hasClass("top-selected")){
        topCell.removeClass("bottom-selected");
    }

    if($(currcell).hasClass("bottom-selected")){
        bottomCell.removeClass("top-selected");
    }

    if($(currcell).hasClass("left-selected")){
        leftCell.removeClass("right-selected");
    }

    if($(currcell).hasClass("right-selected")){
        rightCell.removeClass("left-selected");
    }

    $(currcell).removeClass("selected top-selected bottom-selected left-selected right-selected");
}