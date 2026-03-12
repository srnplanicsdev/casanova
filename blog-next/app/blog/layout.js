import BackButton from "../components/BackButton";

export default function BlogLayout ({children}){
  return (
    <div className="blog-layout">
   <div className="p-3">
           <BackButton />
           </div>
      <main>{children}</main>
    </div>
  );
}