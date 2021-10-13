import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});


export const fetchPlugin = (input: string) => {
    return{
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({filter: /(^index\.js$)/}, ()=> {
                return {
                    loader: 'jsx',
                    contents: input,
                };
            });

            build.onLoad({filter: /.*/}, async (args: any) =>{
                //check to see if we have already fetched this file
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                //and if it is, return immediately
                if (cachedResult) {
                    return cachedResult;
                }
            });

            build.onLoad({filter: /.css$/}, async (args: any) => {

                const { data, request} = await axios.get(args.path);
                // args.path = key

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents = `
                            const style = document.createElement('style');
                            style.innerText = '${escaped}';
                            document.head.appendChild(style);
                        `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                //store responce in cache
                await fileCache.setItem(args.path, result);

                return result;
                //vales stored
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {

                const { data, request} = await axios.get(args.path);
                // args.path = key

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                //store responce in cache
                await fileCache.setItem(args.path, result);

                return result;
                //vales stored
            });
        }
    }
}
