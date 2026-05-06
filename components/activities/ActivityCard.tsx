import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { Activity } from '@/data/activities';
import { useLanguage } from '@/hooks/useLanguage';

interface ActivityCardProps {
  activity: Activity;
}

const TYPE_CONFIG: Record<Activity['type'], { icon: keyof typeof MaterialIcons.glyphMap; color: string; bg: string }> = {
  snorkeling: { icon: 'pool', color: '#0EA5E9', bg: '#E0F2FE' },
  camel: { icon: 'pets', color: Colors.sunset, bg: '#FFF3E0' },
  desert: { icon: 'nights-stay', color: '#7C3AED', bg: '#EDE9FE' },
  atv: { icon: 'two-wheeler', color: '#D97706', bg: '#FEF3C7' },
  diving: { icon: 'scuba-diving', color: Colors.ocean, bg: '#DBEAFE' },
};

const DIFFICULTY_CONFIG: Record<Activity['difficulty'], { label: string; labelAr: string; color: string; bg: string }> = {
  easy: { label: 'Easy', labelAr: 'سهل', color: Colors.palm, bg: '#DCFCE7' },
  moderate: { label: 'Moderate', labelAr: 'متوسط', color: '#D97706', bg: '#FEF3C7' },
  hard: { label: 'Advanced', labelAr: 'متقدم', color: Colors.error, bg: '#FEE2E2' },
};

export const ActivityCard = memo(({ activity }: ActivityCardProps) => {
  const { language, isRTL, t } = useLanguage();

  const name = language === 'ar' ? activity.nameAr : activity.nameEn;
  const description = language === 'ar' ? activity.descriptionAr : activity.descriptionEn;
  const duration = language === 'ar' ? activity.durationAr : activity.duration;
  const area = language === 'ar' ? activity.areaAr : activity.area;
  const highlights = language === 'ar' ? activity.highlightsAr : activity.highlights;

  const typeConfig = TYPE_CONFIG[activity.type];
  const diffConfig = DIFFICULTY_CONFIG[activity.difficulty];
  const diffLabel = language === 'ar' ? diffConfig.labelAr : diffConfig.label;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like to book the "${activity.nameEn}" activity. Please share availability and details.`
    );
    Linking.openURL(`https://wa.me/${activity.whatsapp.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: activity.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {/* Difficulty badge on image */}
        <View style={[styles.diffBadge, { backgroundColor: diffConfig.bg }]}>
          <Text style={[styles.diffText, { color: diffConfig.color }]}>{diffLabel}</Text>
        </View>
        {/* Type icon */}
        <View style={[styles.typeIcon, { backgroundColor: typeConfig.bg }]}>
          <MaterialIcons name={typeConfig.icon} size={18} color={typeConfig.color} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Area */}
        <View style={[styles.areaRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <MaterialIcons name="place" size={12} color={Colors.sunset} />
          <Text style={styles.areaText}>{area}</Text>
        </View>

        {/* Name */}
        <Text style={[styles.name, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
          {name}
        </Text>

        {/* Description */}
        <Text style={[styles.description, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
          {description}
        </Text>

        {/* Highlights */}
        <View style={[styles.highlights, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {highlights.slice(0, 2).map((h, i) => (
            <View key={i} style={[styles.highlightChip, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <MaterialIcons name="check-circle" size={12} color={Colors.palm} />
              <Text style={styles.highlightText} numberOfLines={1}>{h}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer: Duration + Price */}
        <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={[styles.metaItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <MaterialIcons name="access-time" size={14} color={Colors.textMuted} />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
          <View style={styles.priceBlock}>
            <Text style={styles.priceLabel}>{t('from')}</Text>
            <Text style={styles.priceValue}>{activity.priceMin}</Text>
            <Text style={styles.priceUnit}> {t('egp')}</Text>
          </View>
        </View>

        {/* WhatsApp CTA */}
        <Pressable
          style={({ pressed }) => [styles.waBtn, pressed && { opacity: 0.82, transform: [{ scale: 0.98 }] }]}
          onPress={handleWhatsApp}
        >
          <MaterialIcons name="chat" size={16} color={Colors.white} />
          <Text style={styles.waBtnText}>{t('bookWhatsApp')}</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.md,
  },
  imageWrapper: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  diffBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  diffText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  typeIcon: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  areaRow: {
    alignItems: 'center',
    gap: 3,
  },
  areaText: {
    fontSize: FontSize.xs,
    color: Colors.sunset,
    fontWeight: FontWeight.semibold,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.night,
    lineHeight: 24,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  highlights: {
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  highlightChip: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.palm + '12',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  highlightText: {
    fontSize: FontSize.xs,
    color: Colors.palm,
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  priceLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  priceValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.ocean,
  },
  priceUnit: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  waBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#25D366',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 4,
    marginTop: 2,
  },
  waBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
