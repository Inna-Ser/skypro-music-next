import classNames from "classnames";
import styles from "./VolumeBlock.module.css";
import { useThemeContext } from "../../../themesComponent/ThemesComponent";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentVolume, setIsMute } from "../../../store/slices/volumeSlice";

export const VolumeBlock = () => {
  const isMute = useSelector((store) => store.volume.isMute);
  const currentVolume = useSelector((store) => store.volume.currentVolume);
  // const [volume, setVolume] = useState(null);
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  const changeVolume = (e) => {
    const newVolume = e.target.value / 100;
    console.log(e);
    dispatch(setCurrentVolume(newVolume));
  };

  const mute = () => {
    if (isMute) {
      dispatch(setIsMute(true));
    } else {
      dispatch(setIsMute(false));
    }
  };

  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage} onClick={mute}>
          <svg className={styles.volumeSvg} alt="volume">
            <use
              xlinkHref={
                theme.mode === "dark"
                  ? isMute
                    ? "img/icon/sprite.svg#icon-volume-cancel-dark"
                    : "img/icon/sprite.svg#icon-volume-dark"
                  : isMute
                  ? "img/icon/sprite.svg#icon-volume-cancel-light"
                  : "img/icon/sprite.svg#icon-volume-light"
              }
            >
              /
            </use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
            // value={currentVolume * 100}
            onChange={changeVolume}
          />
        </div>
      </div>
    </div>
  );
};
