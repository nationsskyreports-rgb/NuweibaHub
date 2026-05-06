import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { ACTIVITIES, Activity } from '@/data/activities';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { Header } from '@/components';

type TypeFilter = 'all' | Activity['type'];
type DifficultyFilter = 'all' | Activity['difficulty'];

const TYPE_TABS: { key: TypeFilter; icon: keyof typeof MaterialIcons.glyphMap; labelKey: string }[] = [
  { key: 'all', icon: 'apps', labelKey: 'activityAll' },
  { key: 'snorkeling', icon: 'pool', labelKey: 'activitySnorkeling' },
  { key: 'camel', icon: 'pets', labelKey: 'activityCamel' },
  { key: 'desert', icon: 'nights-stay', labelKey: 'activityDesert' },
  { key: 'atv', icon: 'two-wheeler', labelKey: 'activityATV' },
  { key: 'diving', icon: 'scuba-diving', labelKey: 'activityDiving' },
];

const DIFFICULTY_FILTERS: { key: DifficultyFilter; labelKey: string }[] = [
  { key: 'all', labelKey: 'diffAll' },
  { key: 'easy', labelKey: 'diffEasy' },
  { key: 'moderate', labelKey: 'diffModerate' },
  { key: 'hard', labelKey: 'diffHard' },
];

const TYPE_COLORS: Record<TypeFilter, string> = {
  all: Colors.ocean,
  snorkeling: '#0EA5E9',
  camel: Colors.sunset,
  desert: '#7C3AED',
  atv: '#D97706',
  diving: Colors.ocean,
};

export default function ActivitiesScreen() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>('all');

  const filtered = useMemo(() => {
    return ACTIVITIES.filter((a) => {
      const matchType = typeFilter === 'all' || a.type === typeFilter;
      const matchDiff = diffFilter === 'all' || a.difficulty === diffFilter;
      return matchType && matchDiff;
    });
  }, [typeFilter, diffFilter]);

  const statsRow = [
    { value: String(ACTIVITIES.length), labelKey: 'activitiesCount' },
    { value: `${Math.min(...ACTIVITIES.map((a) => a.priceMin))}+`, labelKey: 'egp' },
    { value: '5', labelKey: 'activityTypes' },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* Title */}
            <View style={[styles.titleSection, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
                {t('activitiesTitle')}
              </Text>
              <Text style={styles.subtitle}>{t('activitiesSubtitle')}</Text>
            </View>

            {/* Stats */}
            <View style={[styles.statsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              {statsRow.map((s, i) => (
                <View key={i} style={styles.statItem}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{t(s.labelKey as any)}</Text>
                </View>
              ))}
            </View>

            {/* Type filter scrollable chips */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { textAlign: isRTL ? 'right' : 'left' }]}>
                {t('activityType')}
              </Text>
              <View style={[styles.chipRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                {TYPE_TABS.map((tab) => {
                  const isActive = typeFilter === tab.key;
                  const color = TYPE_COLORS[tab.key];
                  return (
                    <Pressable
                      key={tab.key}
                      style={[
                        styles.typeChip,
                        isActive
                          ? { backgroundColor: color, borderColor: color }
                          : { backgroundColor: Colors.surface, borderColor: Colors.border },
                      ]}
                      onPress={() => setTypeFilter(tab.key)}
                    >
                      <MaterialIcons
                        name={tab.icon}
                        size={15}
                        color={isActive ? Colors.white : Colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.chipText,
                          { color: isActive ? Colors.white : Colors.textSecondary },
                        ]}
                      >
                        {t(tab.labelKey as any)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Difficulty filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { textAlign: isRTL ? 'right' : 'left' }]}>
                {t('difficulty')}
              </Text>
              <View style={[styles.chipRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                {DIFFICULTY_FILTERS.map((f) => {
                  const isActive = diffFilter === f.key;
                  return (
                    <Pressable
                      key={f.key}
                      style={[
                        styles.diffChip,
                        isActive ? styles.diffChipActive : styles.diffChipInactive,
                      ]}
                      onPress={() => setDiffFilter(f.key)}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          { color: isActive ? Colors.white : Colors.textSecondary },
                        ]}
                      >
                        {t(f.labelKey as any)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Result count */}
            <Text style={[styles.resultCount, { textAlign: isRTL ? 'right' : 'left' }]}>
              {filtered.length} {t('activitiesTitle')}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ActivityCard activity={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="explore-off" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyText}>{t('noResults')}</Text>
            <Pressable
              style={styles.resetBtn}
              onPress={() => { setTypeFilter('all'); setDiffFilter('all'); }}
            >
              <Text style={styles.resetText}>{t('resetFilters')}</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 32,
  },
  titleSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.night,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    backgroundColor: Colors.night,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.sand,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.tabBarInactive,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  filterSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  filterLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  chipRow: {
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  diffChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  diffChipActive: {
    backgroundColor: Colors.ocean,
    borderColor: Colors.ocean,
  },
  diffChipInactive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  resultCount: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  cardWrapper: {
    paddingHorizontal: Spacing.md,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  resetBtn: {
    backgroundColor: Colors.ocean,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  resetText: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
});
