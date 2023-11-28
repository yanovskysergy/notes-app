import { useSelector } from "react-redux";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { TagItem } from "@/shared/components/TagItem";
import { filterTagsSelector } from "@/store/slices/filterNotesSlice/selectors";
import { useTagsAutocomplete } from "./FilterByTags.hooks";
import styles from "./FilterByTags.module.scss";

export const FilterByTags = () => {
  const { options, value, setValue, onAddTag, onDeleteTag, onClearAllTags } =
    useTagsAutocomplete();
  const tagFilters = useSelector(filterTagsSelector);

  return (
    <div className={styles.container}>
      <Typography variant="h6" textAlign="center">
        Filtering
      </Typography>
      <br />
      <Autocomplete
        size="small"
        disabled={!options.length}
        value={null}
        inputValue={value}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => setValue(e.target.value)}
            label="Add filter tag"
          />
        )}
        onChange={(e, v) => v && onAddTag(v)}
        options={options}
        noOptionsText="No tags"
      />
      <br />
      <Button onClick={onClearAllTags}>Clear all filters</Button>
      <div className={styles["tag-list"]}>
        {tagFilters.map(({ label, id }) => (
          <TagItem
            key={id}
            label={label}
            onDelete={() => onDeleteTag(id)}
            active
          />
        ))}
      </div>
    </div>
  );
};
