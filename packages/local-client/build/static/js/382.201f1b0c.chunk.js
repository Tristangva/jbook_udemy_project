(this.webpackJsonpjbook=this.webpackJsonpjbook||[]).push([[382],{512:function(s,n){!function(s){var n=[/(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\1)[^\\`$])*\1/.source,/<<-?\s*(["']?)(\w+)\2\s[\s\S]*?[\r\n]\3/.source].join("|");s.languages["shell-session"]={command:{pattern:RegExp(/^(?:[^\s@:$#*!/\\]+@[^\s@:$#*!/\\]+(?::[^\0-\x1F$#*?"<>:;|]+)?)?[$#](?:[^\\\r\n'"<]|\\.|<<str>>)+/.source.replace(/<<str>>/g,(function(){return n})),"m"),greedy:!0,inside:{info:{pattern:/^[^#$]+/,alias:"punctuation",inside:{path:{pattern:/(:)[\s\S]+/,lookbehind:!0},user:/^[^:]+/,punctuation:/:/}},bash:{pattern:/(^[$#]\s*)\S[\s\S]*/,lookbehind:!0,alias:"language-bash",inside:s.languages.bash},"shell-symbol":{pattern:/^[$#]/,alias:"important"}}},output:/.(?:.*(?:[\r\n]|.$))*/},s.languages["sh-session"]=s.languages.shellsession=s.languages["shell-session"]}(Prism)}}]);
//# sourceMappingURL=382.201f1b0c.chunk.js.map