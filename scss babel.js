const scssString =
`#header {
    width: 100%;
    height: 200px;
    .nav ul {
        height: 100px
        display: flex
        li {
            flex: 1
            color: gray
            &:hover {
                color: #fff;
            }
            span a {
                background: gray;
            }
            &:hover span a {
                background: red;
            }
        }
    }
    .icon {position: absolute; top: 0;left: 0;}
}`;

// 验证网址： https://www.sassmeister.com/      (报错在语句后面加入分号即可，我做了兼容)
console.log(TransformScss(scssString));
function TransformScss(str) {
    console.log();
    var fsArr = formatData(str);
    var babelResult = babelScss(fsArr);
    return babelResult;
}

// 对scss按照：'\n'、';\n'、';'三种方式拆解
function formatData(str) {
    return str.replace(/(\{)(\n)*/g, '{\n').replace(/(\})(\n)*/g, '\n}\n').replace(/( )( )+/g, '').replace(/(\n)+/g, '\n').trim().split(/;\n|;|\n/);
    // 0: "#header{"
    // 1: "width:100%"
    // 2: "height:200px"
    // 3: ".nav{"
    // 4: "height:100px"
    // 5: "display:flex"
    // 6: "li{"
    // 7: "flex:1"
    // 8: "color:gray"
    // 9: "&:hover{"
    // 10: "color:#fff"
    // 11: "}"
    // 12: "}"
    // 13: "}"
    // 14: ".icon{"
    // 15: "position:absolute"
    // 16: "top:0"
    // 17: "left:0"
    // 18: "}"
    // 19: "}"
}

function babelScss(arr) {
    var selectors = [];
    return (arr.map(item => {
        if(/\{/.test(item)) {
            selectors.push(item.slice(0, -1));
            const needSplit = selectors.length > 1 ? '}' : '';
            return needSplit + selectors.join(' ') + '{'
        }
        if(/\}/.test(item)) {
            selectors.pop();
            return ''
        }
        return item + ';';
    }).join('') + '}').replace(/( )*\&/g, '').replace(/( )+/g, ' ');
}
