$(function () {
    /* 预览 */
  $("#vpreview-btn").click(function () {
    $("#vpreview").html(marked($("#veditor").val()));
    $("#vpreview").toggle()
  })
  /* 编辑 */
  $("#veditor").keyup(function () {
    if(!$("#vpreview").is(":hidden")){
      $("#vpreview").html(marked($("#veditor").val()));
    }
  })
  /* 快捷 */
  $(".vheader a[a-data]").click(function () {
      const data = $(this).attr('a-data');
      const veditor = $("#veditor")
      const cursorX = evalTools.cursorX(veditor[0])

      /*加粗*/
      if (data == 'h') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `# ${txt}`, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 2, end + 2, end + 2)
      }

      /*加粗*/
      if (data == 'b') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `**${txt}**`, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 2, end + 2, end + 2)
      }
      /*链接*/
      if (data == 'link') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `[${txt}]()`, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 1, end + 1, end + 1)
      }
      /*代码*/
      if (data == 'code') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `\`\`\`${txt}\`\`\``, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 3, end + 3, end + 3)
      }
      /*引用*/
      if (data == 'quote') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `> ${txt}`, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 2, end + 2, end + 2)
      }
      /*图片*/
      if (data == 'img') {
          // 选中的文本
          const {
              start,
              end,
              txt
          } = evalTools.getSelectTxt(veditor[0])

          evalTools.insertTxt(veditor[0], `![${txt}]()`, cursorX + txt.length, txt.length)
          evalTools.selectTxt(veditor[0], start + 2, end + 2, end + 2)
      }

  })
})

var evalTools = {
  /**
   * 选取文本框中的文本
   *
   * @param {Object} Object Dom对象
   * @param {Number} Number 开始位置
   * @param {Number} Number 结束位置
   * @param {Number} Number 当前位置
   *            @example
   *            evalTools.selectTxt(el,1,2,2);
   */
  selectTxt: function (el, start, end, curPosition) {
      var range;
      if (document.createRange) {
          el.setSelectionRange(start, end);
      } else {
          range = el.createTextRange();
          range.collapse(1);
          range.moveStart('character', start);
          range.moveEnd('character', end - start);
          range.select();
      }
  },
  /**
   * 返回文本框中的文本参数
   *
   * @param {Object} Object Dom对象
   * @return {Object} Object {start:开始位置,end:结束位置,txt:选中文本}
   *            @example
   *            getSelectTxt(el);
   */
  getSelectTxt: function (el) {
      var start = evalTools.cursorX(el), end = 0, txt = '';
      if (document.selection) {
          txt = document.selection.createRange().text;
          end = start + txt.length;
      } else {
          end = el.selectionEnd;
          txt = el.value.substring(start, end);
      }
      return {
          start: start,
          end: end,
          txt: txt
      }
  },
  insertTxt: function (el, text, cursorX, del) {
      if (del == undefined) {
          del = 0;
      }
      el.focus();
      if (document.selection) {
          var range = document.selection.createRange();
          range.moveStart('character', -del);
          range.text = text;
      } else {
          var textTmp = el.value,
              cursor = cursorX + text.length - del;
          el.value = textTmp.substring(0, cursorX - del) + text + textTmp.substring(cursorX, textTmp.length);
          evalTools.selectTxt(el, cursor, cursor, cursor);
      }
  },
  /**
   * 获取光标位置
   *
   * @param {Object} Object Dom对象
   * @return {Number} Number 光标位置
   *            @example
   *            evalTools.cursorX(el);
   */
  cursorX: function (el) {
      if (document.selection) {

          var range = document.selection.createRange(), position = 0, txt;
          range.moveStart('character', -el.value.length);
          txt = range.text.split('\001');
          var selectedTxt = document.selection.createRange().text; //有文字选中时，取到的evalTools.cursorX包括了选中的文字长度
          position = txt[txt.length - 1].replace(/\r/g, '').length - selectedTxt.length;
          return position;

      } else return el.selectionStart;
  },
}