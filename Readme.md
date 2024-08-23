<h4>Fork 
    https://github.com/ajaxorg/ace 
</h4>

 - added support for lsfusion language with antlr grammar
 - removed all unused modes, available modes: typescript, text, plain_text, lsf, js, html, css, java
 - removed all unused themes, available themes: ambiance, chrome

how-to:
- Create Worker and Mode for you kind of analysis
- Download Ace source code and install NodeJS
- Put your new files within correspond Ace source code folders
- Build Ace
- Add build files to your project
- Use new mode: editor.getSession().setMode("ace/mode/semicolonlineend");

For lsf antlr grammar put antlrLsfJSLogics.js into /lib/ace/mode/antlr
Building Ace
-----------
```bash
npm install
node ./Makefile.dryice.js
```