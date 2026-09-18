// // // import React, { useMemo, useState } from "react";
// // // import { createRoot } from "react-dom/client";
// // // import {
// // //   BarChart3, CheckCircle2, Clock3, FolderKanban, LayoutDashboard,
// // //   LogOut, Menu, Search, Settings, X, ChevronDown, CalendarDays, Eye, EyeOff
// // // } from "lucide-react";
// // // import {
// // //   ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
// // //   Tooltip, PieChart, Pie, Cell, Legend
// // // } from "recharts";
// // // import "./styles.css";

// // // const initialProjects = [
// // //   {id:"PRJ-001",name:"Website Redesign",duration:"12 weeks",status:"Completed",progress:100,start:"Jan 08, 2026",end:"Mar 31, 2026"},
// // //   {id:"PRJ-002",name:"Mobile Banking App",duration:"20 weeks",status:"In Progress",progress:72,start:"Feb 02, 2026",end:"Jun 22, 2026"},
// // //   {id:"PRJ-003",name:"CRM Migration",duration:"16 weeks",status:"In Progress",progress:54,start:"Apr 06, 2026",end:"Jul 27, 2026"},
// // //   {id:"PRJ-004",name:"Analytics Portal",duration:"10 weeks",status:"In Progress",progress:38,start:"Jul 13, 2026",end:"Sep 21, 2026"},
// // //   {id:"PRJ-005",name:"Customer Support AI",duration:"14 weeks",status:"Not Started",progress:0,start:"Oct 05, 2026",end:"Jan 11, 2027"}
// // // ];

// // // const trend = [
// // //   {month:"Apr", value:35},{month:"May", value:44},{month:"Jun", value:53},
// // //   {month:"Jul", value:61},{month:"Aug", value:68},{month:"Sep", value:74}
// // // ];

// // // function Badge({status}) {
// // //   return <span className={"badge "+status.toLowerCase().replaceAll(" ","-")}>{status}</span>;
// // // }

// // // function Login({onLogin,credentials}) {
// // //   const [email,setEmail]=useState(credentials.email);
// // //   const [password,setPassword]=useState(credentials.password);
// // //   const [error,setError]=useState("");
// // //   const [showPassword,setShowPassword]=useState(false);
// // //   function submit(e){
// // //     e.preventDefault();
// // //     if(!email || !password){setError("Please enter email and password.");return;}
// // //     setError(""); onLogin(email);
// // //   }
// // //   return <div className="login-screen">
// // //     <div className="login-box">
// // //       <div className="logo"><span><FolderKanban size={21}/></span><b>ProjectPulse</b></div>
// // //       <h1>Welcome back</h1>
// // //       <p className="muted">Sign in to manage your projects.</p>
// // //       <form onSubmit={submit}>
// // //         <label>Email address</label>
// // //         <input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
// // //         <label>Password</label>
// // //         <div className="password-field"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?"text":"password"} /><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
// // //         {error && <div className="error">{error}</div>}
// // //         <button className="primary">Sign in</button>
// // //       </form>
// // //       <small className="demo">Demo credentials are pre-filled.</small>
// // //     </div>
// // //   </div>;
// // // }

// // // function Dashboard({onLogout,credentials,onCredentialsChange}) {
// // //   const [projects,setProjects]=useState(initialProjects);
// // //   const [selectedId,setSelectedId]=useState("PRJ-002");
// // //   const [filter,setFilter]=useState("All");
// // //   const [query,setQuery]=useState("");
// // //   const [mobile,setMobile]=useState(false);
// // //   const [openMenu,setOpenMenu]=useState("Dashboard");
// // //   const [activeView,setActiveView]=useState("overview");
// // //   const [editorMode,setEditorMode]=useState(null);
// // //   const [draft,setDraft]=useState(null);
// // //   const [taskName,setTaskName]=useState("");
// // //   const [tasks,setTasks]=useState([{id:1,title:"Confirm project requirements",done:true},{id:2,title:"Complete interface design",done:true},{id:3,title:"Build project deliverables",done:false},{id:4,title:"Review with stakeholders",done:false},{id:5,title:"Finalise deployment",done:false}]);
// // //   const [accountDraft,setAccountDraft]=useState({...credentials});
// // //   const [showAccountPassword,setShowAccountPassword]=useState(false);
// // //   const today = new Date().toISOString().split("T")[0];

// // // const getTomorrow = (date) => {
// // //   if (!date) return today;

// // //   const selectedDate = new Date(date);
// // //   selectedDate.setDate(selectedDate.getDate() + 1);

// // //   return selectedDate.toISOString().split("T")[0];
// // // };

// // //   const selected=projects.find(p=>p.id===selectedId) || projects[0];
// // //   const counts=useMemo(()=>({
// // //     total:projects.length,
// // //     completed:projects.filter(p=>p.status==="Completed").length,
// // //     progress:projects.filter(p=>p.status==="In Progress").length,
// // //     notStarted:projects.filter(p=>p.status==="Not Started").length
// // //   }),[projects]);

// // //   const visible=projects.filter(p=>
// // //     (filter==="All" || p.status===filter) &&
// // //     (p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()))
// // //   );

// // //   const statusData=[
// // //     {name:"Completed",value:counts.completed},
// // //     {name:"In Progress",value:counts.progress},
// // //     {name:"Not Started",value:counts.notStarted}
// // //   ];

// // //   function beginCreate(){
// // //     const next=projects.length+1;
// // //     setDraft({id:`PRJ-${String(next).padStart(3,"0")}`,name:"",duration:"",status:"Not Started",progress:0,start:"",end:""});
// // //     setEditorMode("create"); setActiveView("create-project"); setOpenMenu("Project");
// // //   }

// // //   function beginEdit(project=selected){
// // //     if(!project) return;
// // //     setDraft({...project}); setEditorMode("edit"); setActiveView("projects"); setOpenMenu("Project");
// // //   }

// // //   function saveProject(e){
// // //     e.preventDefault();
// // //     if(!draft?.name.trim()) return;
// // //     const project={...draft,name:draft.name.trim(),duration:draft.duration.trim() || "Not specified",progress:Math.max(0,Math.min(100,Number(draft.progress)||0))};
// // //     if(editorMode==="create") setProjects([...projects,project]);
// // //     else setProjects(projects.map(p=>p.id===project.id?project:p));
// // //     setSelectedId(project.id); setEditorMode(null); setActiveView("projects");
// // //   }

// // //   function deleteProject(){
// // //     if(!selected || projects.length===1) return;
// // //     if(!window.confirm(`Delete ${selected.name}? This cannot be undone.`)) return;
// // //     const remaining=projects.filter(p=>p.id!==selected.id);
// // //     setProjects(remaining); setSelectedId(remaining[0].id); setEditorMode(null); setActiveView("projects");
// // //   }

// // //   const navigation = [
// // //     {label:"Dashboard", icon:<LayoutDashboard/>, items:[{label:"Overview", view:"overview"}]},
// // //     {label:"Project", icon:<FolderKanban/>, items:[{label:"All projects", view:"projects"},{label:"Create project", view:"create-project"}]},
// // //     {label:"Status", icon:<BarChart3/>, items:[{label:"In progress", view:"in-progress"},{label:"Completed", view:"completed"},{label:"Not started", view:"not-started"}]},
// // //     {label:"Operation", icon:<Settings/>, items:[{label:"Work tracker", view:"work-tracker"},{label:"Timeline", view:"timeline"},{label:"Account settings", view:"settings"}]}
// // //   ];

// // //   const viewTitles = {
// // //     overview:["Dashboard","Project portfolio overview"], projects:["Projects","Browse and select a project"],
// // //     "create-project":["Create project","Start a new project from your workspace"], "in-progress":["In progress","Projects that are actively being delivered"],
// // //     completed:["Completed","Projects that have been delivered"], "not-started":["Not started","Projects that are ready to begin"],
// // //     timeline:["Timeline","Key dates for the selected project"], "work-tracker":["Work tracker","Tasks completed and work still remaining"], settings:["Account settings","Update your sign-in credentials"]
// // //   };

// // //   function chooseView(menu, view){
// // //     setOpenMenu(menu); setActiveView(view); setMobile(false);
// // //     if(view==="create-project") beginCreate();
// // //     if(view!=="projects" && view!=="create-project") setEditorMode(null);
// // //   }

// // //   const displayedProjects = activeView === "in-progress" ? projects.filter(p=>p.status==="In Progress") : activeView === "completed" ? projects.filter(p=>p.status==="Completed") : activeView === "not-started" ? projects.filter(p=>p.status==="Not Started") : projects;
// // //   const completedTasks=tasks.filter(task=>task.done).length;
// // //   const workPercent=tasks.length?Math.round((completedTasks/tasks.length)*100):0;

// // //   function addTask(e){e.preventDefault();if(!taskName.trim())return;setTasks([...tasks,{id:Date.now(),title:taskName.trim(),done:false}]);setTaskName("");}
// // //   function saveCredentials(e){e.preventDefault();if(!accountDraft.email.trim()||!accountDraft.password)return;const updated={...accountDraft,email:accountDraft.email.trim()};onCredentialsChange(updated);setAccountDraft(updated);}

// // //   return <div className="app">
// // //     <aside className={"sidebar "+(mobile?"show":"")}>
// // //       <div className="logo"><span><FolderKanban size={20}/></span><b>ProjectPulse</b></div>
// // //       <nav>
// // //         {navigation.map(item=><div className="nav-group" key={item.label}>
// // //           <button className={"nav-toggle "+(openMenu===item.label?"open":"")} onClick={()=>setOpenMenu(openMenu===item.label?"":item.label)} aria-expanded={openMenu===item.label}>
// // //             <span>{item.icon}{item.label}</span><ChevronDown/>
// // //           </button>
// // //           {openMenu===item.label && <div className="nav-dropdown">
// // //             {item.items.map(entry=><button key={entry.view} className={activeView===entry.view?"active":""} onClick={()=>chooseView(item.label,entry.view)}>{entry.label}</button>)}
// // //           </div>}
// // //         </div>)}
// // //       </nav>
// // //       <div className="side-bottom">
// // //         <div className="profile"><div className="avatar">A</div><div><b>Admin User</b><small>Project Manager</small></div></div>
// // //         <button onClick={onLogout} className="logout"><LogOut/> Sign out</button>
// // //       </div>
// // //     </aside>

// // //     <main className="main">
// // //       <header className="header">
// // //         <button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
// // //         <div><h2>{viewTitles[activeView][0]}</h2><p>{viewTitles[activeView][1]}</p></div>
// // //         <div className="header-right">
// // //           <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects"/></div>
// // //           <div className="avatar">A</div>
// // //         </div>
// // //       </header>

// // //       <div className="content">
// // //         {activeView !== "overview" && <section className="section-display">
// // //           <div className="section-intro"><span className="label">{openMenu.toUpperCase()}</span><h1>{viewTitles[activeView][0]}</h1><p>{viewTitles[activeView][1]}</p></div>
// // //           {(activeView === "projects" || activeView === "create-project") && <>
// // //             <div className="management-actions"><button onClick={beginCreate} className="add">+ New project</button>{selected && <><button onClick={()=>beginEdit(selected)} className="secondary">Edit selected</button><button onClick={deleteProject} className="danger" disabled={projects.length===1}>Delete selected</button></>}</div>
// // //             {(activeView === "create-project" || editorMode === "edit") && draft && <form className="project-form" onSubmit={saveProject}>
// // //               <div className="form-title"><div><span className="label">PROJECT DETAILS</span><h3>{editorMode === "edit" ? `Edit ${draft.id}` : "New project"}</h3></div><button type="button" className="text-button" onClick={()=>{setEditorMode(null);setActiveView("projects")}}>Cancel</button></div>
// // //               <label>Project name<input required value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} placeholder="e.g. Customer portal"/></label>
// // //               <div className="form-row"><label>Status<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}><option>Not Started</option><option>In Progress</option><option>Completed</option></select></label></div>
// // //               <div className="form-row"><label>Progress (%)<input type="number" min="0" max="100" value={draft.progress} onChange={e=>setDraft({...draft,progress:e.target.value})}/></label><label>Start date<input type="date" value={draft.start} onChange={e=>setDraft({...draft,start:e.target.value})}/></label><label>End date<input type="date" value={draft.end} onChange={e=>setDraft({...draft,end:e.target.value})}/></label></div>
// // //               <button className="add" type="submit">{editorMode === "edit" ? "Save changes" : "Create project"}</button>
// // //             </form>}
// // //           </>}
// // //           {activeView === "work-tracker" && <div className="work-tracker"><div className="work-summary"><div><span className="label">PROJECT WORKLOAD</span><h3>{completedTasks} of {tasks.length} tasks complete</h3><p>{tasks.length-completedTasks} task{tasks.length-completedTasks===1?"":"s"} remaining · {workPercent}% finished</p></div><div className="work-percent">{workPercent}%</div></div><div className="work-bar"><i style={{width:workPercent+"%"}}/></div><form className="add-task" onSubmit={addTask}><input value={taskName} onChange={e=>setTaskName(e.target.value)} placeholder="Add a task for this project"/><button className="add">+ Add task</button></form><div className="task-list">{tasks.map(task=><label className={"task-item "+(task.done?"done":"")} key={task.id}><input type="checkbox" checked={task.done} onChange={()=>setTasks(tasks.map(item=>item.id===task.id?{...item,done:!item.done}:item))}/><span>{task.title}</span><small>{task.done?"Complete":"Remaining"}</small></label>)}</div></div>}
// // //           {activeView === "timeline" && <><div className="timeline-project"><span className="label">SHOWING TIMELINE FOR</span><h3>{selected.name}</h3><p>{selected.id} · {selected.status}</p></div><div className="timeline-list"><div><b>Start</b><span>{selected.start}</span></div><div><b>Current progress</b><span>{selected.progress}% complete</span></div><div><b>Target completion</b><span>{selected.end}</span></div></div></>}
// // //           {activeView === "settings" && <form className="account-form" onSubmit={saveCredentials}><label>Email address<input type="email" value={accountDraft.email} onChange={e=>setAccountDraft({...accountDraft,email:e.target.value})}/></label><label>New password<div className="password-field"><input type={showAccountPassword?"text":"password"} value={accountDraft.password} onChange={e=>setAccountDraft({...accountDraft,password:e.target.value})}/><button type="button" onClick={()=>setShowAccountPassword(!showAccountPassword)} aria-label={showAccountPassword?"Hide password":"Show password"}>{showAccountPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label><button className="add" type="submit">Save credentials</button></form>}
// // //           {activeView !== "timeline" && activeView !== "settings" && activeView !== "work-tracker" && <div className="project-grid">
// // //             {displayedProjects.map(p=><button className={"project-tile "+(selectedId===p.id?"selected":"")} key={p.id} onClick={()=>setSelectedId(p.id)}><span>{p.id}</span><b>{p.name}</b><small>{p.duration} · {p.progress}% complete</small><Badge status={p.status}/></button>)}
// // //           </div>}
// // //         </section>}
// // //         {activeView === "overview" && <>
// // //         <section className="hero">
// // //           <div>
// // //             <span className="label">SELECTED PROJECT</span>
// // //             <h1>{selected.name}</h1>
// // //             <div className="meta"><b>{selected.id}</b><span>•</span><span>{selected.duration}</span><span>•</span><Badge status={selected.status}/></div>
// // //           </div>
// // //           <div className="project-select">
// // //             <label>Project</label>
// // //             <select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>
// // //               {projects.map(p=><option key={p.id} value={p.id}>{p.id} — {p.name}</option>)}
// // //             </select>
// // //           </div>
// // //         </section>

// // //         <section className="stats">
// // //           <div className="stat"><div className="icon purple"><FolderKanban/></div><div><span>Total Projects</span><strong>{counts.total}</strong><small>All projects</small></div></div>
// // //           <div className="stat"><div className="icon green"><CheckCircle2/></div><div><span>Completed</span><strong>{counts.completed}</strong><small>Finished</small></div></div>
// // //           <div className="stat"><div className="icon blue"><BarChart3/></div><div><span>In Progress</span><strong>{counts.progress}</strong><small>Active</small></div></div>
// // //           <div className="stat"><div className="icon orange"><Clock3/></div><div><span>Not Started</span><strong>{counts.notStarted}</strong><small>Upcoming</small></div></div>
// // //         </section>

// // //         <section className="charts">
// // //           <div className="card">
// // //             <div className="card-head"><div><h3>Overall progress</h3><p>Portfolio completion trend</p></div><span className="year">2026</span></div>
// // //             <ResponsiveContainer width=" 100%" height={260}>
// // //               <LineChart data={trend} margin={{top:10,right:15,left:-20,bottom:0}}>
// // //                 <CartesianGrid strokeDasharray="3 3" vertical={false}/>
// // //                 <XAxis dataKey="month"/><YAxis domain={[0,100]} tickFormatter={v=>v+"%"}/>
// // //                 <Tooltip formatter={v=>[v+"%","Progress"]}/>
// // //                 <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{r:4}}/>
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //           <div className="card">
// // //             <div className="card-head"><div><h3>Project status</h3><p>Current status distribution</p></div></div>
// // //             <ResponsiveContainer width="100%" height={260}>
// // //               <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={92} paddingAngle={4}>
// // //                 <Cell fill="#22c55e"/><Cell fill="#6366f1"/><Cell fill="#94a3b8"/>
// // //               </Pie><Tooltip/><Legend verticalAlign="bottom"/></PieChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </section>

// // //         <section className="bottom">
// // //           <div className="card projects-card">
// // //             <div className="card-head">
// // //               <div><h3>Projects</h3><p>Manage and review project details</p></div>
// // //               <div className="actions"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Not Started</option><option>In Progress</option><option>Completed</option></select><button onClick={beginCreate} className="add">+ Add project</button></div>
// // //             </div>
// // //             <div className="table-scroll">
// // //               <table><thead><tr><th>Project</th><th>Duration</th><th>Progress</th><th>Status</th></tr></thead>
// // //               <tbody>{visible.map(p=><tr key={p.id} onClick={()=>setSelectedId(p.id)}>
// // //                 <td><b>{p.name}</b><small>{p.id}</small></td><td>{p.duration}</td>
// // //                 <td><div className="progress-cell"><div><i style={{width:p.progress+"%"}}/></div><span>{p.progress}%</span></div></td>
// // //                 <td><Badge status={p.status}/></td>
// // //               </tr>)}</tbody></table>
// // //             </div>
// // //           </div>

// // //           <div className="card details">
// // //             <div className="card-head"><div><h3>Project details</h3><p>Selected project</p></div><div className="detail-actions"><button onClick={()=>beginEdit(selected)} className="text-button">Edit</button><button onClick={deleteProject} className="text-button delete" disabled={projects.length===1}>Delete</button></div></div>
// // //             <div className="details-list">
// // //               <div><span>Project ID</span><b>{selected.id}</b></div>
// // //               <div><span>Project name</span><b>{selected.name}</b></div>
// // //               <div><span>Duration</span><b>{selected.duration}</b></div>
// // //               <div><span>Start date</span><b>{selected.start}</b></div>
// // //               <div><span>End date</span><b>{selected.end}</b></div>
// // //               <div><span>Status</span><Badge status={selected.status}/></div>
// // //             </div>
// // //             <div className="completion"><div><span>Completion</span><b>{selected.progress}%</b></div><div className="bigbar"><i style={{width:selected.progress+"%"}}/></div></div>
// // //           </div>
// // //         </section>
// // //         </>}
// // //       </div>
// // //     </main>
// // //   </div>;
// // // }

// // // function App(){
// // //   const [logged,setLogged]=useState(false);
// // //   const [credentials,setCredentials]=useState({email:"admin@projectpulse.com",password:"admin123"});
// // //   return logged?<Dashboard onLogout={()=>setLogged(false)} credentials={credentials} onCredentialsChange={setCredentials}/>:<Login credentials={credentials} onLogin={()=>setLogged(true)}/>;
// // // }
// // // createRoot(document.getElementById("root")).render(<App/>);

// // import React, { useMemo, useState } from "react";
// // import { createRoot } from "react-dom/client";
// // import {
// //   BarChart3, CheckCircle2, Clock3, FolderKanban, LayoutDashboard,
// //   LogOut, Menu, Search, Settings, X, ChevronDown, CalendarDays, Eye, EyeOff
// // } from "lucide-react";
// // import {
// //   ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
// //   Tooltip, PieChart, Pie, Cell, Legend
// // } from "recharts";
// // import "./styles.css";

// // const initialProjects = [
// //   {id:"PRJ-001",name:"Website Redesign",duration:"12",status:"Completed",progress:100,start:"2026-01-08",end:"2026-03-31"},
// //   {id:"PRJ-002",name:"Mobile Banking App",duration:"20",status:"In Progress",progress:72,start:"2026-02-02",end:"2026-06-22"},
// //   {id:"PRJ-003",name:"CRM Migration",duration:"16",status:"In Progress",progress:54,start:"2026-04-06",end:"2026-07-27"},
// //   {id:"PRJ-004",name:"Analytics Portal",duration:"10",status:"In Progress",progress:38,start:"2026-07-13",end:"2026-09-21"},
// //   {id:"PRJ-005",name:"Customer Support AI",duration:"14",status:"Not Started",progress:0,start:"2026-10-05",end:"2027-01-11"}
// // ];

// // const trend = [
// //   {month:"Apr", value:35},{month:"May", value:44},{month:"Jun", value:53},
// //   {month:"Jul", value:61},{month:"Aug", value:68},{month:"Sep", value:100}
// // ];

// // function Badge({status}) {
// //   return <span className={"badge "+status.toLowerCase().replaceAll(" ","-")}>{status}</span>;
// // }

// // function Login({onLogin,credentials}) {
// //   const [email,setEmail]=useState(credentials.email);
// //   const [password,setPassword]=useState(credentials.password);
// //   const [error,setError]=useState("");
// //   const [showPassword,setShowPassword]=useState(false);
// //   function submit(e){
// //     e.preventDefault();
// //     if(!email || !password){setError("Please enter email and password.");return;}
// //     setError(""); onLogin(email);
// //   }
// //   return <div className="login-screen">
// //     <div className="login-box">
// //       <div className="logo"><span><FolderKanban size={21}/></span><b>ProjectPulse</b></div>
// //       <h1>Welcome back</h1>
// //       <p className="muted">Sign in to manage your projects.</p>
// //       <form onSubmit={submit}>
// //         <label>Email address</label>
// //         <input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
// //         <label>Password</label>
// //         <div className="password-field"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?"text":"password"} /><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
// //         {error && <div className="error">{error}</div>}
// //         <button className="primary">Sign in</button>
// //       </form>
// //       <small className="demo">Demo credentials are pre-filled.</small>
// //     </div>
// //   </div>;
// // }

// // function Dashboard({onLogout,credentials,onCredentialsChange}) {
// //   const [projects,setProjects]=useState(initialProjects);
// //   const [selectedId,setSelectedId]=useState("PRJ-002");
// //   const [filter,setFilter]=useState("All");
// //   const [query,setQuery]=useState("");
// //   const [mobile,setMobile]=useState(false);
// //   const [openMenu,setOpenMenu]=useState("Dashboard");
// //   const [activeView,setActiveView]=useState("overview");
// //   const [editorMode,setEditorMode]=useState(null);
// //   const [draft,setDraft]=useState(null);
// //   const [taskName,setTaskName]=useState("");
// //   const [tasks,setTasks]=useState([{id:1,title:"Confirm project requirements",done:true},{id:2,title:"Complete interface design",done:true},{id:3,title:"Build project deliverables",done:false},{id:4,title:"Review with stakeholders",done:false},{id:5,title:"Finalise deployment",done:false}]);
// //   const [accountDraft,setAccountDraft]=useState({...credentials});
// //   const [showAccountPassword,setShowAccountPassword]=useState(false);

// //   // Project date constraints: start date can only be today or later,
// //   // and end date must be strictly after the selected start date.
// //   const today = new Date().toISOString().split("T")[0];

// //   const getTomorrow = (date) => {
// //     if (!date) return today;
// //     const selectedDate = new Date(date + "T00:00:00");
// //     selectedDate.setDate(selectedDate.getDate() + 1);
// //     return selectedDate.toISOString().split("T")[0];
// //   };

// //   const formatDate = (date) => {
// //     if (!date) return "Not specified";
// //     const parsed = new Date(date + "T00:00:00");
// //     return Number.isNaN(parsed.getTime())
// //       ? date
// //       : parsed.toLocaleDateString("en-US", {month:"short", day:"2-digit", year:"numeric"});
// //   };

// //   const selected=projects.find(p=>p.id===selectedId) || projects[0];
// //   const counts=useMemo(()=>({
// //     total:projects.length,
// //     completed:projects.filter(p=>p.status==="Completed").length,
// //     progress:projects.filter(p=>p.status==="In Progress").length,
// //     notStarted:projects.filter(p=>p.status==="Not Started").length
// //   }),[projects]);

// //   const visible=projects.filter(p=>{
// //     const searchText=query.trim().toLowerCase();
// //     const matchesSearch=!searchText ||
// //       p.name.toLowerCase().includes(searchText) ||
// //       p.id.toLowerCase().includes(searchText) ||
// //       p.status.toLowerCase().includes(searchText);
// //     const matchesFilter=filter==="All" || p.status===filter;
// //     return matchesSearch && matchesFilter;
// //   });

// //   const statusData=[
// //     {name:"Completed",value:counts.completed},
// //     {name:"In Progress",value:counts.progress},
// //     {name:"Not Started",value:counts.notStarted}
// //   ];

// //   function beginCreate(){
// //     const next=projects.length+1;
// //     setDraft({id:`PRJ-${String(next).padStart(3,"0")}`,name:"",duration:"",status:"Not Started",progress:0,start:"",end:""});
// //     setEditorMode("create"); setActiveView("create-project"); setOpenMenu("Project");
// //   }

// //   function beginEdit(project=selected){
// //     if(!project) return;
// //     setDraft({...project}); setEditorMode("edit"); setActiveView("projects"); setOpenMenu("Project");
// //   }

// //   function saveProject(e){
// //     e.preventDefault();
// //     if(!draft?.name.trim()) return;
// //     const project={
// //       ...draft,
// //       name:draft.name.trim(),
// //       duration:draft.duration ? String(Math.max(1,Math.floor(Number(draft.duration)))) : "",
// //       progress:Math.max(0,Math.min(100,Number(draft.progress)||0))
// //     };
// //     if(editorMode==="create") setProjects([...projects,project]);
// //     else setProjects(projects.map(p=>p.id===project.id?project:p));
// //     setSelectedId(project.id); setEditorMode(null); setActiveView("projects");
// //   }

// //   function deleteProject(){
// //     if(!selected || projects.length===1) return;
// //     if(!window.confirm(`Delete ${selected.name}? This cannot be undone.`)) return;
// //     const remaining=projects.filter(p=>p.id!==selected.id);
// //     setProjects(remaining); setSelectedId(remaining[0].id); setEditorMode(null); setActiveView("projects");
// //   }

// //   const navigation = [
// //     {label:"Dashboard", icon:<LayoutDashboard/>, items:[{label:"Overview", view:"overview"}]},
// //     {label:"Project", icon:<FolderKanban/>, items:[{label:"All projects", view:"projects"},{label:"Create project", view:"create-project"}]},
// //     {label:"Status", icon:<BarChart3/>, items:[{label:"In progress", view:"in-progress"},{label:"Completed", view:"completed"},{label:"Not started", view:"not-started"}]},
// //     {label:"Operation", icon:<Settings/>, items:[{label:"Work tracker", view:"work-tracker"},{label:"Timeline", view:"timeline"},{label:"Account settings", view:"settings"}]}
// //   ];

// //   const viewTitles = {
// //     overview:["Dashboard","Project portfolio overview"], projects:["Projects","Browse and select a project"],
// //     "create-project":["Create project","Start a new project from your workspace"], "in-progress":["In progress","Projects that are actively being delivered"],
// //     completed:["Completed","Projects that have been delivered"], "not-started":["Not started","Projects that are ready to begin"],
// //     timeline:["Timeline","Key dates for the selected project"], "work-tracker":["Work tracker","Tasks completed and work still remaining"], settings:["Account settings","Update your sign-in credentials"]
// //   };

// //   function chooseView(menu, view){
// //     setOpenMenu(menu); setActiveView(view); setMobile(false);
// //     if(view==="create-project") beginCreate();
// //     if(view!=="projects" && view!=="create-project") setEditorMode(null);
// //   }

// //   const displayedProjects = activeView === "in-progress" ? projects.filter(p=>p.status==="In Progress") : activeView === "completed" ? projects.filter(p=>p.status==="Completed") : activeView === "not-started" ? projects.filter(p=>p.status==="Not Started") : projects;
// //   const completedTasks=tasks.filter(task=>task.done).length;
// //   const workPercent=tasks.length?Math.round((completedTasks/tasks.length)*100):0;

// //   function addTask(e){e.preventDefault();if(!taskName.trim())return;setTasks([...tasks,{id:Date.now(),title:taskName.trim(),done:false}]);setTaskName("");}
// //   function saveCredentials(e){e.preventDefault();if(!accountDraft.email.trim()||!accountDraft.password)return;const updated={...accountDraft,email:accountDraft.email.trim()};onCredentialsChange(updated);setAccountDraft(updated);}

// //   return <div className="app">
// //     <aside className={"sidebar "+(mobile?"show":"")}>
// //       <div className="logo"><span><FolderKanban size={20}/></span><b>ProjectPulse</b></div>
// //       <nav>
// //         {navigation.map(item=><div className="nav-group" key={item.label}>
// //           <button className={"nav-toggle "+(openMenu===item.label?"open":"")} onClick={()=>setOpenMenu(openMenu===item.label?"":item.label)} aria-expanded={openMenu===item.label}>
// //             <span>{item.icon}{item.label}</span><ChevronDown/>
// //           </button>
// //           {openMenu===item.label && <div className="nav-dropdown">
// //             {item.items.map(entry=><button key={entry.view} className={activeView===entry.view?"active":""} onClick={()=>chooseView(item.label,entry.view)}>{entry.label}</button>)}
// //           </div>}
// //         </div>)}
// //       </nav>
// //       <div className="side-bottom">
// //         <div className="profile"><div className="avatar">A</div><div><b>Admin User</b><small>Project Manager</small></div></div>
// //         <button onClick={onLogout} className="logout"><LogOut/> Sign out</button>
// //       </div>
// //     </aside>

// //     <main className="main">
// //       <header className="header">
// //         <button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
// //         <div><h2>{viewTitles[activeView][0]}</h2><p>{viewTitles[activeView][1]}</p></div>
// //         <div className="header-right">
// //           <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects"/></div>
// //           <div className="avatar">A</div>
// //         </div>
// //       </header>

// //       <div className="content">
// //         {activeView !== "overview" && <section className="section-display">
// //           <div className="section-intro"><span className="label">{openMenu.toUpperCase()}</span><h1>{viewTitles[activeView][0]}</h1><p>{viewTitles[activeView][1]}</p></div>
// //           {(activeView === "projects" || activeView === "create-project") && <>
// //             <div className="management-actions"><button onClick={beginCreate} className="add">+ New project</button>{selected && <><button onClick={()=>beginEdit(selected)} className="secondary">Edit selected</button><button onClick={deleteProject} className="danger" disabled={projects.length===1}>Delete selected</button></>}</div>
// //             {(activeView === "create-project" || editorMode === "edit") && draft && <form className="project-form" onSubmit={saveProject}>
// //               <div className="form-title"><div><span className="label">PROJECT DETAILS</span><h3>{editorMode === "edit" ? `Edit ${draft.id}` : "New project"}</h3></div><button type="button" className="text-button" onClick={()=>{setEditorMode(null);setActiveView("projects")}}>Cancel</button></div>
// //               <label>Project name<input required value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} placeholder="e.g. Customer portal"/></label>
// //               <div className="form-row">
// //                 <label>
// //                   Duration (weeks)
// //                   <input
// //                     type="number"
// //                     min="1"
// //                     step="1"
// //                     inputMode="numeric"
// //                     value={draft.duration}
// //                     onChange={e=>setDraft({...draft,duration:e.target.value.replace(/\\D/g,"")})}
// //                     placeholder="e.g. 12"
// //                   />
// //                 </label>
// //                 <label>
// //                   Status
// //                   <select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}>
// //                     <option>Not Started</option>
// //                     <option>In Progress</option>
// //                     <option>Completed</option>
// //                   </select>
// //                 </label>
// //               </div>
// //               <div className="form-row">
// //                 <label>
// //                   Progress (%)
// //                   <input type="number" min="0" max="100" value={draft.progress} onChange={e=>setDraft({...draft,progress:e.target.value})}/>
// //                 </label>
// //                 <label>
// //                   Start date
// //                   <input
// //                     type="date"
// //                     min={today}
// //                     value={draft.start}
// //                     onChange={e=>{
// //                       const startDate=e.target.value;
// //                       setDraft({
// //                         ...draft,
// //                         start:startDate,
// //                         end:draft.end && draft.end>startDate ? draft.end : ""
// //                       });
// //                     }}
// //                   />
// //                 </label>
// //                 <label>
// //                   End date
// //                   <input
// //                     type="date"
// //                     min={getTomorrow(draft.start)}
// //                     value={draft.end}
// //                     disabled={!draft.start}
// //                     onChange={e=>setDraft({...draft,end:e.target.value})}
// //                   />
// //                 </label>
// //               </div>
// //               <button className="add" type="submit">{editorMode === "edit" ? "Save changes" : "Create project"}</button>
// //             </form>}
// //           </>}
// //           {activeView === "work-tracker" && <div className="work-tracker">
// //             <div className="tracker-project">
// //               <span className="label">SELECTED PROJECT</span>
// //               <h2>{selected.name}</h2>
// //               <div className="tracker-project-meta">
// //                 <span>{selected.id}</span>
// //                 <span>•</span>
// //                 <span>{selected.status}</span>
// //                 <span>•</span>
// //                 <span>{selected.progress}% project progress</span>
// //               </div>
// //             </div>
// //             <div className="work-summary">
// //               <div>
// //                 <span className="label">PROJECT WORKLOAD</span>
// //                 <h3>{completedTasks} of {tasks.length} tasks complete</h3>
// //                 <p>{tasks.length-completedTasks} task{tasks.length-completedTasks===1?"":"s"} remaining · {workPercent}% finished</p>
// //               </div>
// //               <div className="work-percent">{workPercent}%</div>
// //             </div>
// //             <div className="work-bar"><i style={{width:workPercent+"%"}}/></div>
// //             <form className="add-task" onSubmit={addTask}>
// //               <input value={taskName} onChange={e=>setTaskName(e.target.value)} placeholder={`Add a task for ${selected.name}`}/>
// //               <button className="add">+ Add task</button>
// //             </form>
// //             <div className="task-list">{tasks.map(task=><label className={"task-item "+(task.done?"done":"")} key={task.id}><input type="checkbox" checked={task.done} onChange={()=>setTasks(tasks.map(item=>item.id===task.id?{...item,done:!item.done}:item))}/><span>{task.title}</span><small>{task.done?"Complete":"Remaining"}</small></label>)}</div>
// //           </div>}
// //           {activeView === "timeline" && <><div className="timeline-project"><span className="label">SHOWING TIMELINE FOR</span><h3>{selected.name}</h3><p>{selected.id} · {selected.status}</p></div><div className="timeline-list"><div><b>Start</b><span>{formatDate(selected.start)}</span></div><div><b>Current progress</b><span>{selected.progress}% complete</span></div><div><b>Target completion</b><span>{formatDate(selected.end)}</span></div></div></>}
// //           {activeView === "settings" && <form className="account-form" onSubmit={saveCredentials}><label>Email address<input type="email" value={accountDraft.email} onChange={e=>setAccountDraft({...accountDraft,email:e.target.value})}/></label><label>New password<div className="password-field"><input type={showAccountPassword?"text":"password"} value={accountDraft.password} onChange={e=>setAccountDraft({...accountDraft,password:e.target.value})}/><button type="button" onClick={()=>setShowAccountPassword(!showAccountPassword)} aria-label={showAccountPassword?"Hide password":"Show password"}>{showAccountPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label><button className="add" type="submit">Save credentials</button></form>}
// //           {activeView !== "timeline" && activeView !== "settings" && activeView !== "work-tracker" && <div className="project-grid">
// //             {displayedProjects.map(p=><button className={"project-tile "+(selectedId===p.id?"selected":"")} key={p.id} onClick={()=>setSelectedId(p.id)}><span>{p.id}</span><b>{p.name}</b><small>{p.duration} weeks · {p.progress}% complete</small><Badge status={p.status}/></button>)}
// //           </div>}
// //         </section>}
// //         {activeView === "overview" && <>
// //         <section className="hero">
// //           <div>
// //             <span className="label">SELECTED PROJECT</span>
// //             <h1>{selected.name}</h1>
// //             <div className="meta"><b>{selected.id}</b><span>•</span><span>{selected.duration} weeks</span><span>•</span><Badge status={selected.status}/></div>
// //           </div>
// //           <div className="project-select">
// //             <label>Project</label>
// //             <select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>
// //               {projects.filter(p=>{
// //                 const searchText=query.trim().toLowerCase();
// //                 return !searchText ||
// //                   p.name.toLowerCase().includes(searchText) ||
// //                   p.id.toLowerCase().includes(searchText) ||
// //                   p.status.toLowerCase().includes(searchText);
// //               }).map(p=><option key={p.id} value={p.id}>{p.id} — {p.name}</option>)}
// //             </select>
// //           </div>
// //         </section>

// //         <section className="stats">
// //           <div className="stat"><div className="icon purple"><FolderKanban/></div><div><span>Total Projects</span><strong>{counts.total}</strong><small>All projects</small></div></div>
// //           <div className="stat"><div className="icon green"><CheckCircle2/></div><div><span>Completed</span><strong>{counts.completed}</strong><small>Finished</small></div></div>
// //           <div className="stat"><div className="icon blue"><BarChart3/></div><div><span>In Progress</span><strong>{counts.progress}</strong><small>Active</small></div></div>
// //           <div className="stat"><div className="icon orange"><Clock3/></div><div><span>Not Started</span><strong>{counts.notStarted}</strong><small>Upcoming</small></div></div>
// //         </section>

// //         <section className="charts">
// //           <div className="card">
// //             <div className="card-head"><div><h3>Overall progress</h3><p>Portfolio completion trend</p></div><span className="year">2026</span></div>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <LineChart data={trend} margin={{top:10,right:15,left:-20,bottom:0}}>
// //                 <CartesianGrid strokeDasharray="3 3" vertical={false}/>
// //                 <XAxis dataKey="month"/><YAxis domain={[0,100]} ticks={[0,20,40,60,80,100]} tickFormatter={v=>v+"%"}/>
// //                 <Tooltip formatter={v=>[v+"%","Progress"]}/>
// //                 <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{r:4}}/>
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //           <div className="card">
// //             <div className="card-head"><div><h3>Project status</h3><p>Current status distribution</p></div></div>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={92} paddingAngle={4}>
// //                 <Cell fill="#22c55e"/><Cell fill="#6366f1"/><Cell fill="#94a3b8"/>
// //               </Pie><Tooltip/><Legend verticalAlign="bottom"/></PieChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </section>

// //         <section className="bottom">
// //           <div className="card projects-card">
// //             <div className="card-head">
// //               <div><h3>Projects</h3><p>Manage and review project details</p></div>
// //               <div className="actions"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Not Started</option><option>In Progress</option><option>Completed</option></select><button onClick={beginCreate} className="add">+ Add project</button></div>
// //             </div>
// //             <div className="table-scroll">
// //               <table><thead><tr><th>Project</th><th>Duration</th><th>Progress</th><th>Status</th></tr></thead>
// //               <tbody>{visible.map(p=><tr key={p.id} onClick={()=>setSelectedId(p.id)}>
// //                 <td><b>{p.name}</b><small>{p.id}</small></td><td>{p.duration} weeks</td>
// //                 <td><div className="progress-cell"><div><i style={{width:p.progress+"%"}}/></div><span>{p.progress}%</span></div></td>
// //                 <td><Badge status={p.status}/></td>
// //               </tr>)}</tbody></table>
// //             </div>
// //           </div>

// //           <div className="card details">
// //             <div className="card-head"><div><h3>Project details</h3><p>Selected project</p></div><div className="detail-actions"><button onClick={()=>beginEdit(selected)} className="text-button">Edit</button><button onClick={deleteProject} className="text-button delete" disabled={projects.length===1}>Delete</button></div></div>
// //             <div className="details-list">
// //               <div><span>Project ID</span><b>{selected.id}</b></div>
// //               <div><span>Project name</span><b>{selected.name}</b></div>
// //               <div><span>Duration</span><b>{selected.duration}</b></div>
// //               <div><span>Start date</span><b>{formatDate(selected.start)}</b></div>
// //               <div><span>End date</span><b>{formatDate(selected.end)}</b></div>
// //               <div><span>Status</span><Badge status={selected.status}/></div>
// //             </div>
// //             <div className="completion"><div><span>Completion</span><b>{selected.progress}%</b></div><div className="bigbar"><i style={{width:selected.progress+"%"}}/></div></div>
// //           </div>
// //         </section>
// //         </>}
// //       </div>
// //     </main>
// //   </div>;
// // }

// // function App(){
// //   const [logged,setLogged]=useState(false);
// //   const [credentials,setCredentials]=useState({email:"admin@projectpulse.com",password:"admin123"});
// //   return logged?<Dashboard onLogout={()=>setLogged(false)} credentials={credentials} onCredentialsChange={setCredentials}/>:<Login credentials={credentials} onLogin={()=>setLogged(true)}/>;
// // }
// // createRoot(document.getElementById("root")).render(<App/>);

// import React, { useMemo, useState } from "react";
// import { createRoot } from "react-dom/client";
// import {
//   BarChart3, CheckCircle2, Clock3, FolderKanban, LayoutDashboard,
//   LogOut, Menu, Search, Settings, X, ChevronDown, CalendarDays, Eye, EyeOff
// } from "lucide-react";
// import {
//   ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
//   Tooltip, PieChart, Pie, Cell, Legend
// } from "recharts";
// import "./styles.css";

// const initialProjects = [
//   {id:"PRJ-001",name:"Website Redesign",duration:"12",status:"Completed",progress:100,start:"2026-01-08",end:"2026-03-31"},
//   {id:"PRJ-002",name:"Mobile Banking App",duration:"20",status:"In Progress",progress:72,start:"2026-02-02",end:"2026-06-22"},
//   {id:"PRJ-003",name:"CRM Migration",duration:"16",status:"In Progress",progress:54,start:"2026-04-06",end:"2026-07-27"},
//   {id:"PRJ-004",name:"Analytics Portal",duration:"10",status:"In Progress",progress:38,start:"2026-07-13",end:"2026-09-21"},
//   {id:"PRJ-005",name:"Customer Support AI",duration:"14",status:"Not Started",progress:0,start:"2026-10-05",end:"2027-01-11"}
// ];

// const trend = [
//   {month:"Apr", value:35},{month:"May", value:44},{month:"Jun", value:53},
//   {month:"Jul", value:61},{month:"Aug", value:68},{month:"Sep", value:100}
// ];

// function Badge({status}) {
//   return <span className={"badge "+status.toLowerCase().replaceAll(" ","-")}>{status}</span>;
// }

// function Login({onLogin,credentials}) {
//   const [email,setEmail]=useState(credentials.email);
//   const [password,setPassword]=useState(credentials.password);
//   const [error,setError]=useState("");
//   const [showPassword,setShowPassword]=useState(false);
//   function submit(e){
//     e.preventDefault();
//     if(!email || !password){setError("Please enter email and password.");return;}
//     setError(""); onLogin(email);
//   }
//   return <div className="login-screen">
//     <div className="login-box">
//       <div className="logo"><span><FolderKanban size={21}/></span><b>ProjectPulse</b></div>
//       <h1>Welcome back</h1>
//       <p className="muted">Sign in to manage your projects.</p>
//       <form onSubmit={submit}>
//         <label>Email address</label>
//         <input value={email} onChange={e=>setEmail(e.target.value)} type="email" />
//         <label>Password</label>
//         <div className="password-field"><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword?"text":"password"} /><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
//         {error && <div className="error">{error}</div>}
//         <button className="primary">Sign in</button>
//       </form>
//       <small className="demo">Demo credentials are pre-filled.</small>
//     </div>
//   </div>;
// }

// function Dashboard({onLogout,credentials,onCredentialsChange}) {
//   const [projects,setProjects]=useState(initialProjects);
//   const [selectedId,setSelectedId]=useState("PRJ-002");
//   const [filter,setFilter]=useState("All");
//   const [query,setQuery]=useState("");
//   const [mobile,setMobile]=useState(false);
//   const [openMenu,setOpenMenu]=useState("Dashboard");
//   const [activeView,setActiveView]=useState("overview");
//   const [editorMode,setEditorMode]=useState(null);
//   const [draft,setDraft]=useState(null);
//   const [taskName,setTaskName]=useState("");
//   const [tasks,setTasks]=useState([{id:1,title:"Confirm project requirements",done:true},{id:2,title:"Complete interface design",done:true},{id:3,title:"Build project deliverables",done:false},{id:4,title:"Review with stakeholders",done:false},{id:5,title:"Finalise deployment",done:false}]);
//   const [accountDraft,setAccountDraft]=useState({...credentials});
//   const [showAccountPassword,setShowAccountPassword]=useState(false);

//   // Project date constraints: start date can only be today or later,
//   // and end date must be strictly after the selected start date.
//   const today = new Date().toISOString().split("T")[0];

//   const getTomorrow = (date) => {
//     if (!date) return today;
//     const selectedDate = new Date(date + "T00:00:00");
//     selectedDate.setDate(selectedDate.getDate() + 1);
//     return selectedDate.toISOString().split("T")[0];
//   };

//   const formatDate = (date) => {
//     if (!date) return "Not specified";
//     const parsed = new Date(date + "T00:00:00");
//     return Number.isNaN(parsed.getTime())
//       ? date
//       : parsed.toLocaleDateString("en-US", {month:"short", day:"2-digit", year:"numeric"});
//   };

//   const selected=projects.find(p=>p.id===selectedId) || projects[0];
//   const counts=useMemo(()=>({
//     total:projects.length,
//     completed:projects.filter(p=>p.status==="Completed").length,
//     progress:projects.filter(p=>p.status==="In Progress").length,
//     notStarted:projects.filter(p=>p.status==="Not Started").length
//   }),[projects]);

//   const visible=projects.filter(p=>{
//     const searchText=query.trim().toLowerCase();
//     const matchesSearch=!searchText ||
//       p.name.toLowerCase().includes(searchText) ||
//       p.id.toLowerCase().includes(searchText) ||
//       p.status.toLowerCase().includes(searchText);
//     const matchesFilter=filter==="All" || p.status===filter;
//     return matchesSearch && matchesFilter;
//   });

//   const statusData=[
//     {name:"Completed",value:counts.completed},
//     {name:"In Progress",value:counts.progress},
//     {name:"Not Started",value:counts.notStarted}
//   ];

//   function beginCreate(){
//     const next=projects.length+1;
//     setDraft({id:`PRJ-${String(next).padStart(3,"0")}`,name:"",duration:"",status:"Not Started",progress:0,start:"",end:""});
//     setEditorMode("create"); setActiveView("create-project"); setOpenMenu("Project");
//   }

//   function beginEdit(project=selected){
//     if(!project) return;
//     setDraft({...project}); setEditorMode("edit"); setActiveView("projects"); setOpenMenu("Project");
//   }

//   function saveProject(e){
//     e.preventDefault();
//     if(!draft?.name.trim()) return;
//     const project={
//       ...draft,
//       name:draft.name.trim(),
//       duration:draft.duration ? String(Math.max(1,Math.floor(Number(draft.duration)))) : "",
//       progress:Math.max(0,Math.min(100,Number(draft.progress)||0))
//     };
//     if(editorMode==="create") setProjects([...projects,project]);
//     else setProjects(projects.map(p=>p.id===project.id?project:p));
//     setSelectedId(project.id); setEditorMode(null); setActiveView("projects");
//   }

//   function deleteProject(){
//     if(!selected || projects.length===1) return;
//     if(!window.confirm(`Delete ${selected.name}? This cannot be undone.`)) return;
//     const remaining=projects.filter(p=>p.id!==selected.id);
//     setProjects(remaining); setSelectedId(remaining[0].id); setEditorMode(null); setActiveView("projects");
//   }

//   const navigation = [
//     {label:"Dashboard", icon:<LayoutDashboard/>, items:[{label:"Overview", view:"overview"}]},
//     {label:"Project", icon:<FolderKanban/>, items:[{label:"All projects", view:"projects"},{label:"Create project", view:"create-project"}]},
//     {label:"Status", icon:<BarChart3/>, items:[{label:"In progress", view:"in-progress"},{label:"Completed", view:"completed"},{label:"Not started", view:"not-started"}]},
//     {label:"Operation", icon:<Settings/>, items:[{label:"Work tracker", view:"work-tracker"},{label:"Timeline", view:"timeline"},{label:"Account settings", view:"settings"}]}
//   ];

//   const viewTitles = {
//     overview:["Dashboard","Project portfolio overview"], projects:["Projects","Browse and select a project"],
//     "create-project":["Create project","Start a new project from your workspace"], "in-progress":["In progress","Projects that are actively being delivered"],
//     completed:["Completed","Projects that have been delivered"], "not-started":["Not started","Projects that are ready to begin"],
//     timeline:["Timeline","Key dates for the selected project"], "work-tracker":["Work tracker","Tasks completed and work still remaining"], settings:["Account settings","Update your sign-in credentials"]
//   };

//   function chooseView(menu, view){
//     setOpenMenu(menu); setActiveView(view); setMobile(false);
//     if(view==="create-project") beginCreate();
//     if(view!=="projects" && view!=="create-project") setEditorMode(null);
//   }

//   const displayedProjects = activeView === "in-progress" ? projects.filter(p=>p.status==="In Progress") : activeView === "completed" ? projects.filter(p=>p.status==="Completed") : activeView === "not-started" ? projects.filter(p=>p.status==="Not Started") : projects;
//   const completedTasks=tasks.filter(task=>task.done).length;
//   const workPercent=tasks.length?Math.round((completedTasks/tasks.length)*100):0;

//   function addTask(e){e.preventDefault();if(!taskName.trim())return;setTasks([...tasks,{id:Date.now(),title:taskName.trim(),done:false}]);setTaskName("");}
//   function saveCredentials(e){e.preventDefault();if(!accountDraft.email.trim()||!accountDraft.password)return;const updated={...accountDraft,email:accountDraft.email.trim()};onCredentialsChange(updated);setAccountDraft(updated);}

//   return <div className="app">
//     <aside className={"sidebar "+(mobile?"show":"")}>
//       <div className="logo"><span><FolderKanban size={20}/></span><b>ProjectPulse</b></div>
//       <nav>
//         {navigation.map(item=><div className="nav-group" key={item.label}>
//           <button className={"nav-toggle "+(openMenu===item.label?"open":"")} onClick={()=>setOpenMenu(openMenu===item.label?"":item.label)} aria-expanded={openMenu===item.label}>
//             <span>{item.icon}{item.label}</span><ChevronDown/>
//           </button>
//           {openMenu===item.label && <div className="nav-dropdown">
//             {item.items.map(entry=><button key={entry.view} className={activeView===entry.view?"active":""} onClick={()=>chooseView(item.label,entry.view)}>{entry.label}</button>)}
//           </div>}
//         </div>)}
//       </nav>
//       <div className="side-bottom">
//         <div className="profile"><div className="avatar">A</div><div><b>Admin User</b><small>Project Manager</small></div></div>
//         <button onClick={onLogout} className="logout"><LogOut/> Sign out</button>
//       </div>
//     </aside>

//     <main className="main">
//       <header className="header">
//         <button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
//         <div><h2>{viewTitles[activeView][0]}</h2><p>{viewTitles[activeView][1]}</p></div>
//         <div className="header-right">
//           <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects"/></div>
//           <div className="avatar">A</div>
//         </div>
//       </header>

//       <div className="content">
//         {activeView !== "overview" && <section className="section-display">
//           <div className="section-intro"><span className="label">{openMenu.toUpperCase()}</span><h1>{viewTitles[activeView][0]}</h1><p>{viewTitles[activeView][1]}</p></div>
//           {(activeView === "projects" || activeView === "create-project") && <>
//             <div className="management-actions"><button onClick={beginCreate} className="add">+ New project</button>{selected && <><button onClick={()=>beginEdit(selected)} className="secondary">Edit selected</button><button onClick={deleteProject} className="danger" disabled={projects.length===1}>Delete selected</button></>}</div>
//             {(activeView === "create-project" || editorMode === "edit") && draft && <form className="project-form" onSubmit={saveProject}>
//               <div className="form-title"><div><span className="label">PROJECT DETAILS</span><h3>{editorMode === "edit" ? `Edit ${draft.id}` : "New project"}</h3></div><button type="button" className="text-button" onClick={()=>{setEditorMode(null);setActiveView("projects")}}>Cancel</button></div>
//               <label>Project name<input required value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} placeholder="e.g. Customer portal"/></label>
//               <div className="form-row">
//                 <label>
//                   Duration (weeks)
//                   <input
//                     type="number"
//                     min="1"
//                     step="1"
//                     inputMode="numeric"
//                     value={draft.duration}
//                     onChange={e=>setDraft({...draft,duration:e.target.value.replace(/\\D/g,"")})}
//                     placeholder="e.g. 12"
//                   />
//                 </label>
//                 <label>
//                   Status
//                   <select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}>
//                     <option>Not Started</option>
//                     <option>In Progress</option>
//                     <option>Completed</option>
//                   </select>
//                 </label>
//               </div>
//               <div className="form-row">
//                 <label>
//                   Progress (%)
//                   <input type="number" min="0" max="100" value={draft.progress} onChange={e=>setDraft({...draft,progress:e.target.value})}/>
//                 </label>
//                 <label>
//                   Start date
//                   <input
//                     type="date"
//                     min={today}
//                     value={draft.start}
//                     onChange={e=>{
//                       const startDate=e.target.value;
//                       setDraft({
//                         ...draft,
//                         start:startDate,
//                         end:draft.end && draft.end>startDate ? draft.end : ""
//                       });
//                     }}
//                   />
//                 </label>
//                 <label>
//                   End date
//                   <input
//                     type="date"
//                     min={getTomorrow(draft.start)}
//                     value={draft.end}
//                     disabled={!draft.start}
//                     onChange={e=>setDraft({...draft,end:e.target.value})}
//                   />
//                 </label>
//               </div>
//               <button className="add" type="submit">{editorMode === "edit" ? "Save changes" : "Create project"}</button>
//             </form>}
//           </>}
//           {activeView === "work-tracker" && <div className="work-tracker">
//             <div className="tracker-project">
//               <span className="label">SELECTED PROJECT</span>
//               <h2>{selected.name}</h2>
//               <div className="tracker-project-meta">
//                 <span>{selected.id}</span>
//                 <span>•</span>
//                 <span>{selected.status}</span>
//                 <span>•</span>
//                 <span>{selected.progress}% project progress</span>
//               </div>
//             </div>
//             <div className="work-summary">
//               <div>
//                 <span className="label">PROJECT WORKLOAD</span>
//                 <h3>{completedTasks} of {tasks.length} tasks complete</h3>
//                 <p>{tasks.length-completedTasks} task{tasks.length-completedTasks===1?"":"s"} remaining · {workPercent}% finished</p>
//               </div>
//               <div className="work-percent">{workPercent}%</div>
//             </div>
//             <div className="work-bar"><i style={{width:workPercent+"%"}}/></div>
//             <form className="add-task" onSubmit={addTask}>
//               <input value={taskName} onChange={e=>setTaskName(e.target.value)} placeholder={`Add a task for ${selected.name}`}/>
//               <button className="add">+ Add task</button>
//             </form>
//             <div className="task-list">{tasks.map(task=><label className={"task-item "+(task.done?"done":"")} key={task.id}><input type="checkbox" checked={task.done} onChange={()=>setTasks(tasks.map(item=>item.id===task.id?{...item,done:!item.done}:item))}/><span>{task.title}</span><small>{task.done?"Complete":"Remaining"}</small></label>)}</div>
//           </div>}
//           {activeView === "timeline" && <><div className="timeline-project"><span className="label">SHOWING TIMELINE FOR</span><h3>{selected.name}</h3><p>{selected.id} · {selected.status}</p></div><div className="timeline-list"><div><b>Start</b><span>{formatDate(selected.start)}</span></div><div><b>Current progress</b><span>{selected.progress}% complete</span></div><div><b>Target completion</b><span>{formatDate(selected.end)}</span></div></div></>}
//           {activeView === "settings" && <form className="account-form" onSubmit={saveCredentials}><label>Email address<input type="email" value={accountDraft.email} onChange={e=>setAccountDraft({...accountDraft,email:e.target.value})}/></label><label>New password<div className="password-field"><input type={showAccountPassword?"text":"password"} value={accountDraft.password} onChange={e=>setAccountDraft({...accountDraft,password:e.target.value})}/><button type="button" onClick={()=>setShowAccountPassword(!showAccountPassword)} aria-label={showAccountPassword?"Hide password":"Show password"}>{showAccountPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label><button className="add" type="submit">Save credentials</button></form>}
//           {activeView !== "timeline" && activeView !== "settings" && activeView !== "work-tracker" && <div className="project-grid">
//             {displayedProjects.map(p=><button className={"project-tile "+(selectedId===p.id?"selected":"")} key={p.id} onClick={()=>setSelectedId(p.id)}><span>{p.id}</span><b>{p.name}</b><small>{p.duration} weeks · {p.progress}% complete</small><Badge status={p.status}/></button>)}
//           </div>}
//         </section>}
//         {activeView === "overview" && <>
//         <section className="hero">
//           <div>
//             <span className="label">SELECTED PROJECT</span>
//             <h1>{selected.name}</h1>
//             <div className="meta"><b>{selected.id}</b><span>•</span><span>{selected.duration} weeks</span><span>•</span><Badge status={selected.status}/></div>
//           </div>
//           <div className="project-select">
//             <label>Project</label>
//             <select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>
//               {projects.filter(p=>{
//                 const searchText=query.trim().toLowerCase();
//                 return !searchText ||
//                   p.name.toLowerCase().includes(searchText) ||
//                   p.id.toLowerCase().includes(searchText) ||
//                   p.status.toLowerCase().includes(searchText);
//               }).map(p=><option key={p.id} value={p.id}>{p.id} — {p.name}</option>)}
//             </select>
//           </div>
//         </section>

//         <section className="stats">
//           <div className="stat"><div className="icon purple"><FolderKanban/></div><div><span>Total Projects</span><strong>{counts.total}</strong><small>All projects</small></div></div>
//           <div className="stat"><div className="icon green"><CheckCircle2/></div><div><span>Completed</span><strong>{counts.completed}</strong><small>Finished</small></div></div>
//           <div className="stat"><div className="icon blue"><BarChart3/></div><div><span>In Progress</span><strong>{counts.progress}</strong><small>Active</small></div></div>
//           <div className="stat"><div className="icon orange"><Clock3/></div><div><span>Not Started</span><strong>{counts.notStarted}</strong><small>Upcoming</small></div></div>
//         </section>

//         <section className="charts">
//           <div className="card">
//             <div className="card-head"><div><h3>Overall progress</h3><p>Portfolio completion trend</p></div><span className="year">2026</span></div>
//             <ResponsiveContainer width="100%" height={260}>
//               <LineChart data={trend} margin={{top:10,right:15,left:-20,bottom:0}}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false}/>
//                 <XAxis dataKey="month"/><YAxis domain={[0,100]} ticks={[0,20,40,60,80,100]} tickFormatter={v=>v+"%"}/>
//                 <Tooltip formatter={v=>[v+"%","Progress"]}/>
//                 <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{r:4}}/>
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="card">
//             <div className="card-head"><div><h3>Project status</h3><p>Current status distribution</p></div></div>
//             <ResponsiveContainer width="100%" height={260}>
//               <PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={65} outerRadius={92} paddingAngle={4}>
//                 <Cell fill="#22c55e"/><Cell fill="#6366f1"/><Cell fill="#94a3b8"/>
//               </Pie><Tooltip/><Legend verticalAlign="bottom"/></PieChart>
//             </ResponsiveContainer>
//           </div>
//         </section>

//         <section className="bottom">
//           <div className="card projects-card">
//             <div className="card-head">
//               <div><h3>Projects</h3><p>Manage and review project details</p></div>
//               <div className="actions"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Not Started</option><option>In Progress</option><option>Completed</option></select><button onClick={beginCreate} className="add">+ Add project</button></div>
//             </div>
//             <div className="table-scroll">
//               <table><thead><tr><th>Project</th><th>Duration</th><th>Progress</th><th>Status</th></tr></thead>
//               <tbody>{visible.map(p=><tr key={p.id} onClick={()=>setSelectedId(p.id)}>
//                 <td><b>{p.name}</b><small>{p.id}</small></td><td>{p.duration} weeks</td>
//                 <td><div className="progress-cell"><div><i style={{width:p.progress+"%"}}/></div><span>{p.progress}%</span></div></td>
//                 <td><Badge status={p.status}/></td>
//               </tr>)}</tbody></table>
//             </div>
//           </div>

//           <div className="card details">
//             <div className="card-head"><div><h3>Project details</h3><p>Selected project</p></div><div className="detail-actions"><button onClick={()=>beginEdit(selected)} className="text-button">Edit</button><button onClick={deleteProject} className="text-button delete" disabled={projects.length===1}>Delete</button></div></div>
//             <div className="details-list">
//               <div><span>Project ID</span><b>{selected.id}</b></div>
//               <div><span>Project name</span><b>{selected.name}</b></div>
//               <div><span>Duration</span><b>{selected.duration}</b></div>
//               <div><span>Start date</span><b>{formatDate(selected.start)}</b></div>
//               <div><span>End date</span><b>{formatDate(selected.end)}</b></div>
//               <div><span>Status</span><Badge status={selected.status}/></div>
//             </div>
//             <div className="completion"><div><span>Completion</span><b>{selected.progress}%</b></div><div className="bigbar"><i style={{width:selected.progress+"%"}}/></div></div>
//           </div>
//         </section>
//         </>}
//       </div>
//     </main>
//   </div>;
// }

// function App(){
//   const [logged,setLogged]=useState(false);
//   const [credentials,setCredentials]=useState({email:"admin@projectpulse.com",password:"admin123"});
//   return logged?<Dashboard onLogout={()=>setLogged(false)} credentials={credentials} onCredentialsChange={setCredentials}/>:<Login credentials={credentials} onLogin={()=>setLogged(true)}/>;
// }
// createRoot(document.getElementById("root")).render(<App/>);
 
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

import {
  BarChart3,
  CheckCircle2,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
  ChevronDown,
  Eye,
  EyeOff
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "./styles.css";

const initialProjects = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    duration: "12",
    status: "Completed",
    progress: 100,
    start: "2026-01-08",
    end: "2026-03-31"
  },
  {
    id: "PRJ-002",
    name: "Mobile Banking App",
    duration: "20",
    status: "In Progress",
    progress: 72,
    start: "2026-02-02",
    end: "2026-06-22"
  },
  {
    id: "PRJ-003",
    name: "CRM Migration",
    duration: "16",
    status: "In Progress",
    progress: 54,
    start: "2026-04-06",
    end: "2026-07-27"
  },
  {
    id: "PRJ-004",
    name: "Analytics Portal",
    duration: "10",
    status: "In Progress",
    progress: 38,
    start: "2026-07-13",
    end: "2026-09-21"
  },
  {
    id: "PRJ-005",
    name: "Customer Support AI",
    duration: "14",
    status: "Not Started",
    progress: 0,
    start: "2026-10-05",
    end: "2027-01-11"
  }
];

const trend = [
  { month: "Apr", value: 35 },
  { month: "May", value: 44 },
  { month: "Jun", value: 53 },
  { month: "Jul", value: 61 },
  { month: "Aug", value: 68 },
  { month: "Sep", value: 100 }
];

function Badge({ status }) {
  return (
    <span className={"badge " + status.toLowerCase().replaceAll(" ", "-")}>
      {status}
    </span>
  );
}

function Login({ onLogin, credentials }) {
  const [email, setEmail] = useState(credentials.email);
  const [password, setPassword] = useState(credentials.password);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function submit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    onLogin(email);
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="logo">
          <span>
            <FolderKanban size={21} />
          </span>
          <b>ProjectPulse</b>
        </div>

        <h1>Welcome back</h1>
        <p className="muted">Sign in to manage your projects.</p>

        <form onSubmit={submit}>
          <label>Email address</label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <label>Password</label>

          <div className="password-field">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={17} />
              ) : (
                <Eye size={17} />
              )}
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="primary" type="submit">
            Sign in
          </button>
        </form>

        <small className="demo">
          Demo credentials are pre-filled.
        </small>
      </div>
    </div>
  );
}

function Dashboard({
  onLogout,
  credentials,
  onCredentialsChange
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedId, setSelectedId] = useState("PRJ-002");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [mobile, setMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState("Dashboard");
  const [activeView, setActiveView] = useState("overview");
  const [editorMode, setEditorMode] = useState(null);
  const [draft, setDraft] = useState(null);
  const [taskName, setTaskName] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Confirm project requirements",
      done: true
    },
    {
      id: 2,
      title: "Complete interface design",
      done: true
    },
    {
      id: 3,
      title: "Build project deliverables",
      done: false
    },
    {
      id: 4,
      title: "Review with stakeholders",
      done: false
    },
    {
      id: 5,
      title: "Finalise deployment",
      done: false
    }
  ]);

  const [accountDraft, setAccountDraft] = useState({
    ...credentials
  });

  const [showAccountPassword, setShowAccountPassword] =
    useState(false);

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  function getTomorrow(date) {
    if (!date) return today;

    const selectedDate = new Date(date + "T00:00:00");

    selectedDate.setDate(selectedDate.getDate() + 1);

    return selectedDate.toISOString().split("T")[0];
  }

  function formatDate(date) {
    if (!date) return "Not specified";

    const parsed = new Date(date + "T00:00:00");

    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        });
  }

  const selected =
    projects.find((p) => p.id === selectedId) || projects[0];

  const counts = useMemo(
    () => ({
      total: projects.length,

      completed: projects.filter(
        (p) => p.status === "Completed"
      ).length,

      progress: projects.filter(
        (p) => p.status === "In Progress"
      ).length,

      notStarted: projects.filter(
        (p) => p.status === "Not Started"
      ).length
    }),
    [projects]
  );

  const visible = projects.filter((p) => {
    const searchText = query.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      p.name.toLowerCase().includes(searchText) ||
      p.id.toLowerCase().includes(searchText) ||
      p.status.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || p.status === filter;

    return matchesSearch && matchesFilter;
  });

  const statusData = [
    {
      name: "Completed",
      value: counts.completed
    },
    {
      name: "In Progress",
      value: counts.progress
    },
    {
      name: "Not Started",
      value: counts.notStarted
    }
  ];

  function beginCreate() {
    const next = projects.length + 1;

    setDraft({
      id: `PRJ-${String(next).padStart(3, "0")}`,
      name: "",
      duration: "",
      status: "Not Started",
      progress: 0,
      start: "",
      end: ""
    });

    setEditorMode("create");
    setActiveView("create-project");
    setOpenMenu("Project");
  }

  function beginEdit(project = selected) {
    if (!project) return;

    setDraft({
      ...project
    });

    setEditorMode("edit");
    setActiveView("projects");
    setOpenMenu("Project");
  }

  function saveProject(e) {
    e.preventDefault();

    if (!draft?.name.trim()) {
      return;
    }

    /*
      Duration validation:
      Only positive whole numbers are accepted.
    */
    const duration = Number(draft.duration);

    if (
      !draft.duration ||
      !Number.isInteger(duration) ||
      duration < 1
    ) {
      alert("Duration must be a positive whole number.");
      return;
    }

    const project = {
      ...draft,

      name: draft.name.trim(),

      duration: String(duration),

      progress: Math.max(
        0,
        Math.min(100, Number(draft.progress) || 0)
      )
    };

    if (editorMode === "create") {
      setProjects([...projects, project]);
    } else {
      setProjects(
        projects.map((p) =>
          p.id === project.id ? project : p
        )
      );
    }

    setSelectedId(project.id);
    setEditorMode(null);
    setActiveView("projects");
  }

  function deleteProject() {
    if (!selected || projects.length === 1) {
      return;
    }

    if (
      !window.confirm(
        `Delete ${selected.name}? This cannot be undone.`
      )
    ) {
      return;
    }

    const remaining = projects.filter(
      (p) => p.id !== selected.id
    );

    setProjects(remaining);
    setSelectedId(remaining[0].id);
    setEditorMode(null);
    setActiveView("projects");
  }

  const navigation = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard />,
      items: [
        {
          label: "Overview",
          view: "overview"
        }
      ]
    },
    {
      label: "Project",
      icon: <FolderKanban />,
      items: [
        {
          label: "All projects",
          view: "projects"
        },
        {
          label: "Create project",
          view: "create-project"
        }
      ]
    },
    {
      label: "Status",
      icon: <BarChart3 />,
      items: [
        {
          label: "In progress",
          view: "in-progress"
        },
        {
          label: "Completed",
          view: "completed"
        },
        {
          label: "Not started",
          view: "not-started"
        }
      ]
    },
    {
      label: "Operation",
      icon: <Settings />,
      items: [
        {
          label: "Work tracker",
          view: "work-tracker"
        },
        {
          label: "Timeline",
          view: "timeline"
        },
        {
          label: "Account settings",
          view: "settings"
        }
      ]
    }
  ];

  const viewTitles = {
    overview: [
      "Dashboard",
      "Project portfolio overview"
    ],

    projects: [
      "Projects",
      "Browse and select a project"
    ],

    "create-project": [
      "Create project",
      "Start a new project from your workspace"
    ],

    "in-progress": [
      "In progress",
      "Projects that are actively being delivered"
    ],

    completed: [
      "Completed",
      "Projects that have been delivered"
    ],

    "not-started": [
      "Not started",
      "Projects that are ready to begin"
    ],

    timeline: [
      "Timeline",
      "Key dates for the selected project"
    ],

    "work-tracker": [
      "Work tracker",
      "Tasks completed and work still remaining"
    ],

    settings: [
      "Account settings",
      "Update your sign-in credentials"
    ]
  };

  function chooseView(menu, view) {
    setOpenMenu(menu);
    setActiveView(view);
    setMobile(false);

    if (view === "create-project") {
      beginCreate();
    }

    if (
      view !== "projects" &&
      view !== "create-project"
    ) {
      setEditorMode(null);
    }
  }

  const displayedProjects =
    activeView === "in-progress"
      ? projects.filter(
          (p) => p.status === "In Progress"
        )
      : activeView === "completed"
      ? projects.filter(
          (p) => p.status === "Completed"
        )
      : activeView === "not-started"
      ? projects.filter(
          (p) => p.status === "Not Started"
        )
      : projects;

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const workPercent = tasks.length
    ? Math.round(
        (completedTasks / tasks.length) * 100
      )
    : 0;

  function addTask(e) {
    e.preventDefault();

    if (!taskName.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskName.trim(),
        done: false
      }
    ]);

    setTaskName("");
  }

  function saveCredentials(e) {
    e.preventDefault();

    if (
      !accountDraft.email.trim() ||
      !accountDraft.password
    ) {
      return;
    }

    const updated = {
      ...accountDraft,
      email: accountDraft.email.trim()
    };

    onCredentialsChange(updated);
    setAccountDraft(updated);
  }

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside
        className={
          "sidebar " + (mobile ? "show" : "")
        }
      >
        <div className="logo">
          <span>
            <FolderKanban size={20} />
          </span>
          <b>ProjectPulse</b>
        </div>

        <nav>
          {navigation.map((item) => (
            <div
              className="nav-group"
              key={item.label}
            >
              <button
                className={
                  "nav-toggle " +
                  (openMenu === item.label
                    ? "open"
                    : "")
                }
                onClick={() =>
                  setOpenMenu(
                    openMenu === item.label
                      ? ""
                      : item.label
                  )
                }
                aria-expanded={
                  openMenu === item.label
                }
              >
                <span>
                  {item.icon}
                  {item.label}
                </span>

                <ChevronDown />
              </button>

              {openMenu === item.label && (
                <div className="nav-dropdown">
                  {item.items.map((entry) => (
                    <button
                      key={entry.view}
                      className={
                        activeView === entry.view
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        chooseView(
                          item.label,
                          entry.view
                        )
                      }
                    >
                      {entry.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="side-bottom">
          <div className="profile">
            <div className="avatar">A</div>

            <div>
              <b>Admin User</b>
              <small>Project Manager</small>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="logout"
          >
            <LogOut />
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <button
            className="menu"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>

          <div>
            <h2>
              {viewTitles[activeView][0]}
            </h2>

            <p>
              {viewTitles[activeView][1]}
            </p>
          </div>

          <div className="header-right">
            <div className="search">
              <Search size={17} />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search projects"
              />
            </div>

            <div className="avatar">A</div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          {activeView !== "overview" && (
            <section className="section-display">
              <div className="section-intro">
                <span className="label">
                  {openMenu.toUpperCase()}
                </span>

                <h1>
                  {viewTitles[activeView][0]}
                </h1>

                <p>
                  {viewTitles[activeView][1]}
                </p>
              </div>

              {/* PROJECT MANAGEMENT */}
              {(activeView === "projects" ||
                activeView === "create-project") && (
                <>
                  <div className="management-actions">
                    <button
                      onClick={beginCreate}
                      className="add"
                    >
                      + New project
                    </button>

                    {selected && (
                      <>
                        <button
                          onClick={() =>
                            beginEdit(selected)
                          }
                          className="secondary"
                        >
                          Edit selected
                        </button>

                        <button
                          onClick={deleteProject}
                          className="danger"
                          disabled={
                            projects.length === 1
                          }
                        >
                          Delete selected
                        </button>
                      </>
                    )}
                  </div>

                  {/* PROJECT FORM */}
                  {(activeView ===
                    "create-project" ||
                    editorMode === "edit") &&
                    draft && (
                      <form
                        className="project-form"
                        onSubmit={saveProject}
                      >
                        <div className="form-title">
                          <div>
                            <span className="label">
                              PROJECT DETAILS
                            </span>

                            <h3>
                              {editorMode === "edit"
                                ? `Edit ${draft.id}`
                                : "New project"}
                            </h3>
                          </div>

                          <button
                            type="button"
                            className="text-button"
                            onClick={() => {
                              setEditorMode(null);
                              setActiveView(
                                "projects"
                              );
                            }}
                          >
                            Cancel
                          </button>
                        </div>

                        {/* PROJECT NAME */}
                        <label>
                          Project name

                          <input
                            required
                            value={draft.name}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                name: e.target.value
                              })
                            }
                            placeholder="e.g. Customer portal"
                          />
                        </label>

                        {/* DURATION + STATUS */}
                        <div className="form-row">
                          <label>
                            Duration (weeks)

                            {/* 
                              ONLY NUMERICAL VALUES
                              ARE ALLOWED HERE
                            */}
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={draft.duration}
                              onChange={(e) => {
                                const numericValue =
                                  e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                setDraft({
                                  ...draft,
                                  duration:
                                    numericValue
                                });
                              }}
                              placeholder="e.g. 12"
                            />
                          </label>

                          <label>
                            Status

                            <select
                              value={draft.status}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  status:
                                    e.target.value
                                })
                              }
                            >
                              <option>
                                Not Started
                              </option>

                              <option>
                                In Progress
                              </option>

                              <option>
                                Completed
                              </option>
                            </select>
                          </label>
                        </div>

                        {/* PROGRESS */}
                        <div className="form-row">
                          <label>
                            Progress (%)

                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={draft.progress}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  progress:
                                    e.target.value
                                })
                              }
                            />
                          </label>

                          {/* START DATE */}
                          <label>
                            Start date

                            <input
                              type="date"
                              min={today}
                              value={draft.start}
                              onChange={(e) => {
                                const startDate =
                                  e.target.value;

                                setDraft({
                                  ...draft,
                                  start: startDate,

                                  end:
                                    draft.end &&
                                    draft.end >
                                      startDate
                                      ? draft.end
                                      : ""
                                });
                              }}
                            />
                          </label>

                          {/* END DATE */}
                          <label>
                            End date

                            <input
                              type="date"
                              min={getTomorrow(
                                draft.start
                              )}
                              value={draft.end}
                              disabled={!draft.start}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  end: e.target.value
                                })
                              }
                            />
                          </label>
                        </div>

                        <button
                          className="add"
                          type="submit"
                        >
                          {editorMode === "edit"
                            ? "Save changes"
                            : "Create project"}
                        </button>
                      </form>
                    )}
                </>
              )}

              {/* WORK TRACKER */}
              {activeView === "work-tracker" && (
                <div className="work-tracker">
                  <div className="tracker-project">
                    <span className="label">
                      SELECTED PROJECT
                    </span>

                    <h2>{selected.name}</h2>

                    <div className="tracker-project-meta">
                      <span>{selected.id}</span>
                      <span>•</span>
                      <span>{selected.status}</span>
                      <span>•</span>
                      <span>
                        {selected.progress}%
                        project progress
                      </span>
                    </div>
                  </div>

                  <div className="work-summary">
                    <div>
                      <span className="label">
                        PROJECT WORKLOAD
                      </span>

                      <h3>
                        {completedTasks} of{" "}
                        {tasks.length} tasks complete
                      </h3>

                      <p>
                        {tasks.length -
                          completedTasks}{" "}
                        task
                        {tasks.length -
                          completedTasks ===
                        1
                          ? ""
                          : "s"}{" "}
                        remaining · {workPercent}%
                        finished
                      </p>
                    </div>

                    <div className="work-percent">
                      {workPercent}%
                    </div>
                  </div>

                  <div className="work-bar">
                    <i
                      style={{
                        width:
                          workPercent + "%"
                      }}
                    />
                  </div>

                  <form
                    className="add-task"
                    onSubmit={addTask}
                  >
                    <input
                      value={taskName}
                      onChange={(e) =>
                        setTaskName(e.target.value)
                      }
                      placeholder={`Add a task for ${selected.name}`}
                    />

                    <button className="add">
                      + Add task
                    </button>
                  </form>

                  <div className="task-list">
                    {tasks.map((task) => (
                      <label
                        className={
                          "task-item " +
                          (task.done ? "done" : "")
                        }
                        key={task.id}
                      >
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() =>
                            setTasks(
                              tasks.map((item) =>
                                item.id === task.id
                                  ? {
                                      ...item,
                                      done: !item.done
                                    }
                                  : item
                              )
                            )
                          }
                        />

                        <span>{task.title}</span>

                        <small>
                          {task.done
                            ? "Complete"
                            : "Remaining"}
                        </small>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* TIMELINE */}
              {activeView === "timeline" && (
                <>
                  <div className="timeline-project">
                    <span className="label">
                      SHOWING TIMELINE FOR
                    </span>

                    <h3>{selected.name}</h3>

                    <p>
                      {selected.id} ·{" "}
                      {selected.status}
                    </p>
                  </div>

                  <div className="timeline-list">
                    <div>
                      <b>Start</b>
                      <span>
                        {formatDate(
                          selected.start
                        )}
                      </span>
                    </div>

                    <div>
                      <b>Current progress</b>
                      <span>
                        {selected.progress}%
                        complete
                      </span>
                    </div>

                    <div>
                      <b>
                        Target completion
                      </b>

                      <span>
                        {formatDate(
                          selected.end
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* ACCOUNT SETTINGS */}
              {activeView === "settings" && (
                <form
                  className="account-form"
                  onSubmit={saveCredentials}
                >
                  <label>
                    Email address

                    <input
                      type="email"
                      value={accountDraft.email}
                      onChange={(e) =>
                        setAccountDraft({
                          ...accountDraft,
                          email: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    New password

                    <div className="password-field">
                      <input
                        type={
                          showAccountPassword
                            ? "text"
                            : "password"
                        }
                        value={
                          accountDraft.password
                        }
                        onChange={(e) =>
                          setAccountDraft({
                            ...accountDraft,
                            password:
                              e.target.value
                          })
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowAccountPassword(
                            !showAccountPassword
                          )
                        }
                        aria-label={
                          showAccountPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showAccountPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </label>

                  <button
                    className="add"
                    type="submit"
                  >
                    Save credentials
                  </button>
                </form>
              )}

              {/* PROJECT LIST */}
              {activeView !== "timeline" &&
                activeView !== "settings" &&
                activeView !== "work-tracker" && (
                  <div className="project-grid">
                    {displayedProjects.map((p) => (
                      <button
                        className={
                          "project-tile " +
                          (selectedId === p.id
                            ? "selected"
                            : "")
                        }
                        key={p.id}
                        onClick={() =>
                          setSelectedId(p.id)
                        }
                      >
                        <span>{p.id}</span>

                        <b>{p.name}</b>

                        <small>
                          {p.duration} weeks ·{" "}
                          {p.progress}% complete
                        </small>

                        <Badge
                          status={p.status}
                        />
                      </button>
                    ))}
                  </div>
                )}
            </section>
          )}

          {/* OVERVIEW */}
          {activeView === "overview" && (
            <>
              <section className="hero">
                <div>
                  <span className="label">
                    SELECTED PROJECT
                  </span>

                  <h1>{selected.name}</h1>

                  <div className="meta">
                    <b>{selected.id}</b>

                    <span>•</span>

                    <span>
                      {selected.duration} weeks
                    </span>

                    <span>•</span>

                    <Badge
                      status={selected.status}
                    />
                  </div>
                </div>

                <div className="project-select">
                  <label>Project</label>

                  <select
                    value={selectedId}
                    onChange={(e) =>
                      setSelectedId(
                        e.target.value
                      )
                    }
                  >
                    {projects
                      .filter((p) => {
                        const searchText =
                          query
                            .trim()
                            .toLowerCase();

                        return (
                          !searchText ||
                          p.name
                            .toLowerCase()
                            .includes(
                              searchText
                            ) ||
                          p.id
                            .toLowerCase()
                            .includes(
                              searchText
                            ) ||
                          p.status
                            .toLowerCase()
                            .includes(
                              searchText
                            )
                        );
                      })
                      .map((p) => (
                        <option
                          key={p.id}
                          value={p.id}
                        >
                          {p.id} — {p.name}
                        </option>
                      ))}
                  </select>
                </div>
              </section>

              {/* STATS */}
              <section className="stats">
                <div className="stat">
                  <div className="icon purple">
                    <FolderKanban />
                  </div>

                  <div>
                    <span>Total Projects</span>
                    <strong>{counts.total}</strong>
                    <small>All projects</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="icon green">
                    <CheckCircle2 />
                  </div>

                  <div>
                    <span>Completed</span>
                    <strong>
                      {counts.completed}
                    </strong>
                    <small>Finished</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="icon blue">
                    <BarChart3 />
                  </div>

                  <div>
                    <span>In Progress</span>
                    <strong>
                      {counts.progress}
                    </strong>
                    <small>Active</small>
                  </div>
                </div>

                <div className="stat">
                  <div className="icon orange">
                    <Clock3 />
                  </div>

                  <div>
                    <span>Not Started</span>
                    <strong>
                      {counts.notStarted}
                    </strong>
                    <small>Upcoming</small>
                  </div>
                </div>
              </section>

              {/* CHARTS */}
              <section className="charts">
                <div className="card">
                  <div className="card-head">
                    <div>
                      <h3>
                        Overall progress
                      </h3>

                      <p>
                        Portfolio completion
                        trend
                      </p>
                    </div>

                    <span className="year">
                      2026
                    </span>
                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={260}
                  >
                    <LineChart
                      data={trend}
                      margin={{
                        top: 10,
                        right: 15,
                        left: -20,
                        bottom: 0
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis dataKey="month" />

                      <YAxis
                        domain={[0, 100]}
                        ticks={[
                          0,
                          20,
                          40,
                          60,
                          80,
                          100
                        ]}
                        tickFormatter={(v) =>
                          v + "%"
                        }
                      />

                      <Tooltip
                        formatter={(v) => [
                          v + "%",
                          "Progress"
                        ]}
                      />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <div className="card-head">
                    <div>
                      <h3>
                        Project status
                      </h3>

                      <p>
                        Current status
                        distribution
                      </p>
                    </div>
                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={260}
                  >
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={92}
                        paddingAngle={4}
                      >
                        <Cell fill="#22c55e" />
                        <Cell fill="#6366f1" />
                        <Cell fill="#94a3b8" />
                      </Pie>

                      <Tooltip />

                      <Legend
                        verticalAlign="bottom"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </section>

              {/* BOTTOM SECTION */}
              <section className="bottom">
                <div className="card projects-card">
                  <div className="card-head">
                    <div>
                      <h3>Projects</h3>

                      <p>
                        Manage and review
                        project details
                      </p>
                    </div>

                    <div className="actions">
                      <select
                        value={filter}
                        onChange={(e) =>
                          setFilter(
                            e.target.value
                          )
                        }
                      >
                        <option>All</option>
                        <option>
                          Not Started
                        </option>
                        <option>
                          In Progress
                        </option>
                        <option>
                          Completed
                        </option>
                      </select>

                      <button
                        onClick={beginCreate}
                        className="add"
                      >
                        + Add project
                      </button>
                    </div>
                  </div>

                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Duration</th>
                          <th>Progress</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {visible.map((p) => (
                          <tr
                            key={p.id}
                            onClick={() =>
                              setSelectedId(
                                p.id
                              )
                            }
                          >
                            <td>
                              <b>{p.name}</b>
                              <small>
                                {p.id}
                              </small>
                            </td>

                            <td>
                              {p.duration} weeks
                            </td>

                            <td>
                              <div className="progress-cell">
                                <div>
                                  <i
                                    style={{
                                      width:
                                        p.progress +
                                        "%"
                                    }}
                                  />
                                </div>

                                <span>
                                  {p.progress}%
                                </span>
                              </div>
                            </td>

                            <td>
                              <Badge
                                status={
                                  p.status
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="card details">
                  <div className="card-head">
                    <div>
                      <h3>
                        Project details
                      </h3>

                      <p>
                        Selected project
                      </p>
                    </div>

                    <div className="detail-actions">
                      <button
                        onClick={() =>
                          beginEdit(
                            selected
                          )
                        }
                        className="text-button"
                      >
                        Edit
                      </button>

                      <button
                        onClick={deleteProject}
                        className="text-button delete"
                        disabled={
                          projects.length === 1
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="details-list">
                    <div>
                      <span>Project ID</span>
                      <b>{selected.id}</b>
                    </div>

                    <div>
                      <span>
                        Project name
                      </span>
                      <b>
                        {selected.name}
                      </b>
                    </div>

                    <div>
                      <span>Duration</span>
                      <b>
                        {selected.duration}
                      </b>
                    </div>

                    <div>
                      <span>Start date</span>
                      <b>
                        {formatDate(
                          selected.start
                        )}
                      </b>
                    </div>

                    <div>
                      <span>End date</span>
                      <b>
                        {formatDate(
                          selected.end
                        )}
                      </b>
                    </div>

                    <div>
                      <span>Status</span>

                      <Badge
                        status={
                          selected.status
                        }
                      />
                    </div>
                  </div>

                  <div className="completion">
                    <div>
                      <span>Completion</span>

                      <b>
                        {selected.progress}%
                      </b>
                    </div>

                    <div className="bigbar">
                      <i
                        style={{
                          width:
                            selected.progress +
                            "%"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  const [logged, setLogged] = useState(false);

  const [credentials, setCredentials] =
    useState({
      email: "admin@projectpulse.com",
      password: "admin123"
    });

  return logged ? (
    <Dashboard
      onLogout={() => setLogged(false)}
      credentials={credentials}
      onCredentialsChange={setCredentials}
    />
  ) : (
    <Login
      credentials={credentials}
      onLogin={() => setLogged(true)}
    />
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);