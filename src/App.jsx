import {
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
  ListItemText,
  ListItem,
  RadioGroup,
  InputLabel,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Textarea from "@mui/joy/Textarea";
import { isGlobalMenu, isNordic } from "./data/data";
import { useState } from "react";
import uniqid from "uniqid";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import FileSaver from "file-saver";
import "./App.css";

const segmentOptions = ["Main Menu", "Sub Menu"];
const menuOptions = [{ filename: "March 23 Sample_Report", url: "/March 23 Sample_Report.docx" }];

function App() {
  const [isGlobal, setIsGlobal] = useState("");
  const [menu, setMenu] = useState([]);
  const [segments, setSegments] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [segmentType, setSegmentType] = useState(segmentOptions[0]);
  const [segmentValue, setSegmentValue] = useState("");
  const [isVolume, setIsVolume] = useState(false);
  const [volume, setVolume] = useState("");
  const [revenue, setRevenue] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [baseYear, setBaseYear] = useState("");
  const [keyword, setKeyword] = useState("");

  const generateDocument = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileUrl, true);
    xhr.responseType = "arraybuffer";

    const data = {
      Volume: volume,
      Revenue: revenue,
      FromYear: fromYear,
      ToYear: toYear,
      BaseYear: baseYear,
      Keyword: keyword,
      Segment: segments.map((seg) => ({
        SegmentName: seg.text,
        SubSegment: seg.submenu.map((subSeg) => ({ SubSegmentName: subSeg.text })),
      })),
      RC: menu.map((m) => ({
        RegionName: m.text,
        Country: m.submenu.map((c) => ({ CountryName: c.text })),
      })),
    };

    xhr.onload = () => {
      const templatecontent = xhr.response;
      const zip = new PizZip(templatecontent);
      const doc = new Docxtemplater();
      doc.loadZip(zip);

      doc.setData(data);
      doc.render();
      const output = doc.getZip().generate({ type: "blob" });
      FileSaver.saveAs(output, "output.docx");
    };
    xhr.send();
  };

  const deleteMenu = ({ type, item, subItem }) => {
    if (type.menuType === "main-menu") {
      type.listType === "segment"
        ? setSegments((prev) => prev.filter((i) => i.id !== item.id))
        : setMenu((prev) => prev.filter((i) => i.id !== item.id));
      return;
    }
    if (type.menuType === "sub-menu") {
      type.listType === "segment"
        ? setSegments((prev) =>
            prev.map((menu) => {
              if (menu.id === item.id) {
                const updatedSubmenu = menu.submenu.filter((st) => st.id !== subItem.id);
                console.log(updatedSubmenu);
                return { ...menu, submenu: updatedSubmenu };
              }
              return menu;
            })
          )
        : setMenu((prev) =>
            prev.map((menu) => {
              if (menu.id === item.id) {
                const updatedSubmenu = menu.submenu.filter((st) => st.id !== subItem.id);
                console.log(updatedSubmenu);
                return { ...menu, submenu: updatedSubmenu };
              }
              return menu;
            })
          );
    }
  };

  function addSegment(e) {
    e.preventDefault();
    setSegmentValue("");
    if (segmentType === segmentOptions[0]) {
      setSegments((prev) => [
        ...prev,
        {
          id: uniqid(),
          text: segmentValue,
          submenu: [],
        },
      ]);
      return;
    }
    if (segmentType === segmentOptions[1]) {
      const lastItem = segments[segments.length - 1];
      if (!lastItem) return alert("Please select Main segment First");

      const updatedLastItem = {
        ...lastItem,
        submenu: [...lastItem?.submenu, { id: uniqid(), text: segmentValue }],
      };
      const updateSegments = [...prev.slice(0, prev.length - 1), updatedLastItem];

      setSegments(updateSegments);
    }
  }

  const isDisabled = !(revenue && fromYear && toYear && baseYear && keyword && (isGlobal || isNordic) && fileUrl);

  return (
    <Box p={4}>
      <Typography component="h1" variant="h4" marginBottom={2} textAlign="center">
        Download Sample
      </Typography>
      <Grid container spacing={3}>
        <Grid item container alignItems="flex-end" gap={3}>
          <Box>
            <InputLabel>Template*</InputLabel>
            <Autocomplete
              disablePortal
              options={menuOptions.map((i) => i.filename)}
              value={menuOptions.find((i) => i.url === fileUrl)?.filename || ""}
              sx={{ width: "400px" }}
              onChange={(_, newValue) => setFileUrl(menuOptions.find((i) => i.filename === newValue)?.url)}
              getOptionLabel={(option) => (typeof option === "number" ? option.toString() : option)}
              renderInput={(params) => <TextField {...params} placeholder="Select Template" />}
            />
          </Box>
          <FormControl>
            <FormControlLabel value="Volume" control={<Radio value={isVolume} onChange={() => setIsVolume((prev) => !prev)} />} label="Is Volume" />
          </FormControl>
        </Grid>
        <Grid item container alignItems="center" gap={3}>
          <Grid item>
            <InputLabel>Volume*</InputLabel>
            <TextField
              disabled={!isVolume}
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              variant="outlined"
              placeholder="Ex. Kilo Tons"
            />
          </Grid>
          <Grid item>
            <InputLabel>Revenue*</InputLabel>
            <TextField value={revenue} onChange={(e) => setRevenue(e.target.value)} variant="outlined" placeholder="USD Millions" />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" gap={3}>
          <Grid item>
            <InputLabel>From Year*</InputLabel>
            <TextField value={fromYear} onChange={(e) => setFromYear(e.target.value)} variant="outlined" />
          </Grid>
          <Grid item>
            <InputLabel>To Year*</InputLabel>
            <TextField value={toYear} onChange={(e) => setToYear(e.target.value)} variant="outlined" />
          </Grid>
          <Grid item>
            <InputLabel>Base Year*</InputLabel>
            <TextField value={baseYear} onChange={(e) => setBaseYear(e.target.value)} variant="outlined" />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" gap={3}>
          <Grid item lg={12}>
            <InputLabel>Keyword*</InputLabel>
            <TextField value={keyword} onChange={(e) => setKeyword(e.target.value)} variant="outlined" fullWidth />
          </Grid>
        </Grid>
        <Grid item container alignItems="flex-end" gap={3}>
          <Grid item lg={5}>
            <InputLabel>Segmentations*</InputLabel>
            <TextField variant="outlined" fullWidth value={segmentValue} onChange={(e) => setSegmentValue(e.target.value)} />
          </Grid>
          <Grid item lg={4}>
            <Autocomplete
              disablePortal
              options={segmentOptions}
              value={segmentType}
              onChange={(_, newValue) => setSegmentType(newValue)}
              renderInput={(params) => <TextField {...params} label="--Select--" />}
              getOptionLabel={(option) => (typeof option === "number" ? option.toString() : option)}
            />
          </Grid>
          <Grid item lg={2}>
            <Button variant="contained" disabled={!segmentValue} type="submit" onClick={addSegment}>
              Add Segment
            </Button>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item>
            <List>
              {segments?.map((s) => (
                <Box key={s.id}>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ minWidth: "20px" }}>{"*"}</ListItemIcon>
                    <ListItemText primary={s?.text} sx={{ display: "block", width: "157px" }} />
                    <ListItemButton onClick={() => deleteMenu({ type: { menuType: "main-menu", listType: "segment" }, item: s })}>
                      <DeleteIcon color="error" />
                    </ListItemButton>
                  </ListItem>
                  {s?.submenu?.map((subItem) => (
                    <Collapse in={true} sx={{ marginLeft: "60px" }} key={subItem?.id}>
                      <List sx={{ padding: 0 }}>
                        <ListItem sx={{ padding: 0 }}>
                          <ListItemIcon sx={{ minWidth: "20px" }}>{">"}</ListItemIcon>
                          <ListItemText primary={subItem?.text} sx={{ display: "block", width: "180px" }} />
                          <ListItemButton onClick={() => deleteMenu({ type: { menuType: "sub-menu", listType: "segment" }, item: s, subItem })}>
                            <DeleteIcon color="error" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Collapse>
                  ))}
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item>
            <FormControl>
              <RadioGroup
                value={isGlobal}
                onChange={(e) => {
                  setIsGlobal(e.target.value);
                  setMenu(e.target.value === "Is Global" ? isGlobalMenu : isNordic);
                }}
              >
                <FormControlLabel value="Is Global" control={<Radio />} label="Is Global" />
                <FormControlLabel value="Is Nordic" control={<Radio />} label="Is Nordic" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item>
            <List>
              {menu.map((item) => (
                <Box key={item.id}>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ minWidth: "20px" }}>{"*"}</ListItemIcon>
                    <ListItemText primary={item.text} sx={{ display: "block", width: "157px" }} />
                    <ListItemButton onClick={() => deleteMenu({ type: { menuType: "main-menu", listType: "isGlobal" }, item })}>
                      <DeleteIcon color="error" />
                    </ListItemButton>
                  </ListItem>
                  {item.submenu.map((subItem) => (
                    <Collapse in={true} sx={{ marginLeft: "60px" }} key={subItem.id}>
                      <List sx={{ padding: 0 }}>
                        <ListItem sx={{ padding: 0 }}>
                          <ListItemIcon sx={{ minWidth: "20px" }}>{">"}</ListItemIcon>
                          <ListItemText primary={subItem.text} sx={{ display: "block", width: "180px" }} />
                          <ListItemButton onClick={() => deleteMenu({ type: { menuType: "sub-menu", listType: "isGlobal" }, item, subItem })}>
                            <DeleteIcon color="error" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Collapse>
                  ))}
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item>
            <InputLabel>Countries*</InputLabel>
            <Textarea placeholder="(One at a line OR Coma seprated)" sx={{ width: "500px", minHeight: "200px" }} />
          </Grid>
        </Grid>
        <Grid item>
          <Input type="file" />
        </Grid>
        <Grid item>
          <Button variant="contained" disabled={isDisabled} type="submit" onClick={generateDocument}>
            Download Document
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
