const $= document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const heading =$('header h2')
const cdThumb=$('.cd-thumb')
const audio=$('#audio')
const playBtn=$('.btn-toggle-play')
const player=$('.player')
const progress=$('#progress')
const next=$('.btn-next')
const prev=$('.btn-prev')
const random=$('.btn-random')
const repeat=$('.btn-repeat')
const playlist=$('.playlist')
const app={
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    songs:[
        {
            name:'Hãy trao cho anh',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3',
            image:'./assets/image/haytraochoanh.png'
        }
        ,
        {
            name:'Bình yên những phút giây',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/BinhYenNhungPhutGiay-SonTungMTP-4915711.mp3',
            image:'./assets/image/binhyennhungphutgiay.png'
        }
        ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }  ,
        {
            name:'Chạy ngay đi',
            singer:'Sơn Tùng MTP',
            path:'./assets/sound/ChayNgayDi-SonTungMTP-5468704.mp3',
            image:'./assets/image/chayngaydi.png'
        }
    ]
    ,
    render:function(){
        const htmls= this.songs.map((song,index)=>{
            return `
                <div class="song ${index===this.currentIndex? 'active':''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
    
            `
        })
        playlist.innerHTML=htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this,'currentSong',{
            get:function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handlEvent: function() {
        const cd =$('.cd');
        const cdWidth = cd.getBoundingClientRect().width;
        const _this=this    
        //xử lý cd quay/ dừng
        const cdThumbAnimate=cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration:10000,
            iterations:Infinity
        })
        cdThumbAnimate.pause()
        //xử lý phóng to thu nhỏ cd
        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop;
            const newCdWidth = Math.max(cdWidth - scrollTop, 0);
            cd.style.width = newCdWidth + 'px';
            cd.style.opacity = newCdWidth / cdWidth;
        }
       
        playBtn.onclick=function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }

        //khi song được play
        audio.onplay=function(){
        _this.isPlaying = true;
        player.classList.add('playing')
        cdThumbAnimate.play()
        }

        //khi song bị pause
        audio.onpause=function(){
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate=function(){
            if(audio.duration){
            const progressPersent=Math.floor(audio.currentTime/audio.duration*100)
            progress.value=progressPersent       
            } 
        }
        
        //Khi tua
        progress.onchange=function(e){
            const seekTime=audio.duration / 100 * e.target.value
            audio.currentTime=seekTime
        }

        //next song
        next.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()

            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
        //prev song
        prev.onclick=function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
            _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()

        }
            //random song
        
        random.onclick = function() {
            _this.isRandom=!_this.isRandom
            random.classList.toggle('active',_this.isRandom)

        }
        audio.onended = () => {
            if (_this.isRandom) {
                _this.randomSong();
            } else if (_this.isRepeat) {
                audio.play();
            } else {
                _this.nextSong(); // Giả sử có phương thức này để chuyển đến bài hát tiếp theo
            }
            audio.play();
            _this.render()
            _this.scrollToActiveSong()

        }
        //xử lý lặp lại một bài hát
        repeat.onclick=function(){
            _this.isRepeat=!_this.isRepeat
            repeat.classList.toggle('active',_this.isRepeat)
        }

        playlist.onclick=function(e){
            const songNode=e.target.closest('.song:not(.active)')
           if(songNode||e.target.closest('.option')){
                if( songNode){
                    _this.currentIndex=Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
           
            }
        }
    },
    scrollToActiveSong:function(){
        $('.song.active').scrollIntoView({
            behavior:'smooth',
            block:'center',
        },500)
    },

    loadCurrentSong: function() {
      
        heading.textContent=this.currentSong.name
        cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
        audio.src=this.currentSong.path
    },
     //next
    nextSong:function(){
        this.currentIndex++
        if(this.currentIndex>= this.songs.length){
            this.currentIndex=0
        }     
        this.loadCurrentSong()   
    },
    //prev
    prevSong:function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
    },
    
    //play random
    randomSong: function(){
        let newIndex
        do{
            newIndex=Math.floor(Math.random()*this.songs.length)
        }while(newIndex===this.currentIndex)
        this.currentIndex=newIndex
        this.loadCurrentSong()
    },
    start:function(){
        //định nghĩa các thuộc tính trong object
        this.defineProperties()
        //lắng nghe và xử lý các sự kiện(DOM event)
        this.handlEvent()

        //tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong()
        //Render playlist
        this.render()
    }
}
app.start()      
