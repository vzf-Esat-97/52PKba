<template>
    <div class="Tosignup">
        <el-dialog :visible.sync="isTosignup" width="380px" top='28vh' :close-on-click-modal="false">
            <!-- 个人报名 -->
            <div v-show="teamAndPerson.entryUnit===1">
                <div class="rr_title">本次报名将花费{{teamAndPerson.entryCost}}PK币,是否报名参赛?</div>
                <div class="agreed1">
                    <!-- <el-checkbox v-model="whterchecked"></el-checkbox> -->
                    <div class="agreed1checkbox">
                        <el-checkbox v-model="whterchecked"></el-checkbox>
                    </div>
                    <div class="agreedspan">
                        <span @click="AgreementPop()">已阅读并接受《我爱PK吧报名声明》</span>
                    </div>
                </div>
                <div class="rr_btn" @click="Determine">确 定</div>
            </div>
        </el-dialog>
        <!-- 报名成功弹框 -->
        <div>
            <Tosignupsuc v-model="isTosignupsuc" />
            <IswhetherLogin @LoginBiniphonesuc='LoginBiniphonesuc' v-model="IswhetherLoginshow" />
        </div>
    </div>
</template>
<script>
import Tosignupsuc from '@/components/Popup/Tosignupsuc' // 报名成功弹框
import IswhetherLogin from '@/components/Popup/IswhetherLogin' // 报名是否阅读报名须知
export default {
    props: {
        value: Boolean,
        teamAndPerson: {
            type: Object,
            default(){
                return
            }
        }
    },
    components:{
        Tosignupsuc,
        IswhetherLogin
    },
    data() {
        return {
            isTosignupsuc:false,
            IswhetherLoginshow:false,
            whterchecked:false
        };
    },
    computed: {
        isTosignup: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    },
    methods: {
        Determine() {
            console.log(this.teamAndPerson.id)
            let url = `/api/Competition/${this.teamAndPerson.id}/Entry/`;
            if(this.whterchecked){
                const data = { memberIDs: [] }
                if (this.teamAndPerson.entryUnit === 1) {
                    data.id = this.$store.state.base.loginInfo.id;
                } else {
                    data.id = this.$store.state.other.selectedGame.organization.id;
                    data.memberIDs = memberIDs
                }
                this.$post(url, data).then(res => {
                    if (res.code == 0) {
                        this.isTosignupsuc=true
                        this.isTosignup=false
                        // this.$message({ type: 'success', message: '报名成功' })
                    } else {
                        this.$message({ type: 'warning', message: res.msg })
                    }
                });
            }else{
                this.$message({ type: 'warning', message: '请阅读并接受声明' })
            }
        },
        AgreementPop(){
            this.IswhetherLoginshow=true
        },
        LoginBiniphonesuc(data){
            this.whterchecked=data
            console.log(data)
        }
    }
}
</script>
<style>
.Tosignup .el-dialog {
  height: 190px;
  background: #121212;
}
.Tosignup .el-dialog__header {
  padding: 0;
}
.Tosignup .el-dialog__body {
  height: 190px;
  padding: 64px 20px 32px 20px;
  text-align: center;
}
.Tosignup .rr_title {
  height: 14px;
  margin-bottom: 10px !important;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.Tosignup .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: 10px auto 0 auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
}

/* 我已阅读相关条例 */
.Tosignup .agreed1 {
    width: 270px;
    height: 25px;
    margin-left: 50px;
    margin-top: 8px;
}
.Tosignup .agreed1checkbox{
    width: 14px;
    height: 14px;
    float: left;
}
.Tosignup .agreed1 .agreedspan{
    width: 234px;
    height: 25px;
    line-height: 24px;
    float: left;
    cursor: pointer;
}
/* 选择框的大小 */
.Tosignup .el-checkbox__input {
  height: 12px;
  width: 12px;
}
/* 选择框的颜色 */
.Tosignup .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.Tosignup .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.Tosignup .el-checkbox__input.is-focus .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
/* 选择框文字的设置 */
.Tosignup .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
.Tosignup .el-checkbox__input.is-checked + .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
</style>