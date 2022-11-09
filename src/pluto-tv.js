import parser from "https://cdn.skypack.dev/iptv-playlist-parser@0.12.1"



// Fetch and Parse IPTV / M3U 
async function fetchAndParse(url) {
  
    if(!url){
    return {iptv_parser_error: "URL to fetch is required"}
  }
   
  
  const rsp = await fetch(url),
        data = await rsp.text();
if (rsp.status != 200){
   return {iptv_parser_error: `HTTP ${rsp.status} error`}
}


//


const playlist = data
let foundData; 
 CheckIfValidPlayList(playlist)
	

async function CheckIfValidPlayList(playlist){
const content = playlist

  let lines = content.split('\n').map(parseLine)
  let firstLine = lines.find(l => l.index === 0)

  if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) {
    
   
   foundData = {iptv_parser_error: "Playlist is not valid"}

  }else{
    const result = parser.parse(playlist)
   
    foundData = result
  }

function parseLine(line, index) {
  return {
    index,
    raw: line
  }
}
}

  return foundData
  
}

export async function ParseM3U(url)
{
  try {
    let result = await fetchAndParse(url);
    return result
  } catch( err ) {
     //console.error( err.message );
    return {iptv_parser_error:  err.message}
  
  }
}


async function t(lang){
  if (!lang){
    return {error:"lang is required"}
  }
  
  let validQuery = await checkifValid(lang)
  
if (validQuery.error){
console.log(validQuery.error)
  
} else {
 let data = await ParseM3U("https://raw.githubusercontent.com/iptv-org/iptv/master/streams/us_pluto.m3u")
  console.log(data.items[2].name)//
}
  async function checkifValid(lang){
    let langs = ["en", "tx"]
    for (const item in langs){
      if (lang === langs[item]){
//console.log("g")
                return {valid_lang: "true"}
      } else{
        return {error: langs}
      }
      
    }
  }
  
 
}
t("end")
/* ParseM3U("https://raw.githubusercontent.com/iptv-org/iptv/master/streams/us_pluto.m3u").then(function(parsed_results) {
  console.log(parsed_results.items[2].name)
  console.log(parsed_results.items[2].tvg.id)
   console.log(parsed_results.items[2].url)
  }); */
